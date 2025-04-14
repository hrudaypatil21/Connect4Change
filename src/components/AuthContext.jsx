import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { auth } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth,
  getIdToken
} from 'firebase/auth';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext();



// Create axios instance with interceptors for automatic token refresh
const createAuthenticatedAxios = (getFreshToken, logout) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Use interceptors to handle token management
  instance.interceptors.request.use(async (config) => {
    // Get token from localStorage on each request
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  // Response interceptor for handling 401 errors
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 401 and not a retry and not a login endpoint
      if (error.response?.status === 401 && 
          !originalRequest._retry && 
          !originalRequest.url?.includes('login')) {
        originalRequest._retry = true;
        
        try {
          // Try to get fresh token
          const newToken = await getFreshToken();
          
          if (!newToken) {
            // If no token available, logout and reject
            logout();
            return Promise.reject(new Error('Authentication failed'));
          }
          
          // Update token in request and retry
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // If refresh fails, logout and reject
          logout();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  
  // Define logout first since it's used in createAuthenticatedAxios
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  const getFreshToken = useCallback(async () => {
    try {
      if (!auth.currentUser) return null;
      
      // Force token refresh
      const token = await getIdToken(auth.currentUser, true);
      
      // Update token in localStorage
      localStorage.setItem('token', token);
      
      // Update user state with new token
      setUser(prev => {
        if (prev) {
          const updated = { ...prev, token };
          localStorage.setItem('user', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
      
      return token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }, []);

  // Create authenticated axios instance
  const api = createAuthenticatedAxios(getFreshToken, logout);

  const updateAuthUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
    }
  }, []);

  // Fixed profile fetchers
  const fetchNgoProfile = useCallback(async (firebaseUser) => {
    const token = await getIdToken(firebaseUser, true);

    try {
      const [profileResponse, ngoResponse] = await Promise.all([
        api.get('/api/user-profile'),
        api.get('/api/ngo-profile')
      ]);
      
      return {
        ...profileResponse.data,
        ...ngoResponse.data,
        token,
        type: 'ngo',
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email
      };
    } catch (error) {
      console.error("Error fetching NGO profile:", error);
      throw error;
    }
  }, []);

  const fetchIndividualProfile = useCallback(async (firebaseUser) => {
    const token = await getIdToken(firebaseUser, true);
    
    try {
      const response = await api.get('/api/user-profile');
      
      return {
        ...response.data,
        token,
        type: 'individual',
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email
      };
    } catch (error) {
      console.error("Error fetching individual profile:", error);
      throw error;
    }
  }, []);

  // Login functions remain mostly the same
  const loginNgo = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      return {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          token,
          type: 'ngo' // Explicitly set type
        }
      };
    } catch (error) {
      throw error;
    }
  };
  
  const loginIndividual = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userCredential.user, true);
      localStorage.setItem('token', token);
      
      const response = await api.post(
        '/api/login-individual',
        {}
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

  // Signup functions with api instance
  const signupNgo = async (email, password, ngoData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userCredential.user, true);
      localStorage.setItem('token', token);
      
      const response = await api.post(
        '/api/register-ngo',
        { ...ngoData, uid: userCredential.user.uid }
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
      const token = await getIdToken(userCredential.user, true);
      localStorage.setItem('token', token);
      
      const response = await api.post(
        '/api/register-individual',
        { ...individualData, uid: userCredential.user.uid }
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

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Get fresh token
          const token = await getIdToken(firebaseUser, true);
          if (!token) throw new Error('No token available');
          
          localStorage.setItem('token', token);
          
          // Determine user type from existing stored data
          const storedUser = JSON.parse(localStorage.getItem('user'));
          let userData;
          
          try {
            if (storedUser?.type === 'ngo') {
              userData = await fetchNgoProfile(firebaseUser);
            } else {
              userData = await fetchIndividualProfile(firebaseUser);
            }
            
            updateAuthUser(userData);
          } catch (profileError) {
            console.error('Profile fetch failed:', profileError);
            
            // If profile fetch fails but we have stored user data with valid token,
            // use that as a fallback
            if (storedUser) {
              updateAuthUser({...storedUser, token});
            } else {
              throw profileError;
            }
          }
        } catch (error) {
          console.error('Authentication failed:', error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        logout();
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [fetchNgoProfile, fetchIndividualProfile, logout]);

  const value = {
    user,
    loginNgo,
    loginIndividual,
    signupNgo,
    signupIndividual,
    logout,
    updateAuthUser,
    loading,
    getFreshToken,
    api
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