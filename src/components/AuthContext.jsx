import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getIdToken
} from 'firebase/auth';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const getFreshToken = useCallback(async () => {
    try {
      if (!auth.currentUser) return null;
      
      // Force token refresh
      const token = await auth.currentUser.getIdToken(true);
      return token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }, []);

  const updateAuthUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  // Separate profile fetchers
  const fetchNgoProfile = async (firebaseUser) => {
    const token = await firebaseUser.getIdToken(true);

    const [profileResponse, ngoResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/api/user-profile`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }),
      axios.get(`${API_BASE_URL}/api/ngo-profile`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
    ]);
    
    return {
      ...profileResponse.data,
      ...ngoResponse.data,
      token,
      type: 'ngo',
      id: uid
    };
  };

  const fetchIndividualProfile = async (token, uid) => {
    const response = await axios.get(`${API_BASE_URL}/api/user-profile`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      ...response.data,
      token,
      type: 'individual',
      id: uid
    };
  };

  

  // Separate login functions
  const loginNgo = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      const response = await axios.post(
        `${API_BASE_URL}/api/login-ngo`,
        {},
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token,
        type: 'ngo', // THIS IS CRUCIAL
        id: response.data.id || userCredential.user.uid
      };
      
      updateAuthUser(userData);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };
  
  const loginIndividual = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      const response = await axios.post(
        `${API_BASE_URL}/api/login-individual`,
        {},
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token,
        type: 'individual',
        id: response.data.id || userCredential.user.uid
      };
      
      updateAuthUser(userData);
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  // Separate signup functions
  const signupNgo = async (email, password, ngoData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      const response = await axios.post(
        `${API_BASE_URL}/api/register-ngo`,
        { ...ngoData, uid: userCredential.user.uid },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email,
        token,
        type: 'ngo'
      };
      
      updateAuthUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const signupIndividual = async (email, password, individualData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      const response = await axios.post(
        `${API_BASE_URL}/api/register-individual`,
        { ...individualData, uid: userCredential.user.uid },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email,
        token,
        type: 'individual'
      };
      
      updateAuthUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await getFreshToken();
          if (!token) throw new Error('No token available');
          
          // Determine user type from existing stored data or fetch fresh
          const storedUser = JSON.parse(localStorage.getItem('user'));
          let userData;
          
          if (storedUser?.type === 'ngo') {
            userData = await fetchNgoProfile(token, firebaseUser.uid);
          } else {
            userData = await fetchIndividualProfile(token, firebaseUser.uid);
          }
          
          updateAuthUser(userData);
        } catch (error) {
          console.error('Authentication failed:', error);
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    loginNgo,
    loginIndividual,
    signupNgo,
    signupIndividual,
    logout,
    updateAuthUser,
    loading,
    getFreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}