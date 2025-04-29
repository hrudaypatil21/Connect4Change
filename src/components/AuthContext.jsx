import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
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
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
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
      if (!auth.currentUser) {
        logout();
        return null;
      }
      
      const token = await getIdToken(auth.currentUser, true);
      localStorage.setItem('token', token);
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
      logout();
      return null;
    }
  }, [logout]);

  const api = useMemo(() => createAuthenticatedAxios(getFreshToken, logout), [getFreshToken, logout]);

  const updateAuthUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
    }
  }, []);

  const refreshRecommendations = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

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
  }, [api]);

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
  }, [api]);

  const loginNgo = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      refreshRecommendations();
      return {
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          token,
          type: 'ngo'
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
      
      const response = await api.post('/api/login-individual', {});
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token,
        type: 'individual',
        id: response.data.id || userCredential.user.uid
      };
      
      updateAuthUser(userData);
      refreshRecommendations();
      return userCredential;
    } finally {
      setLoading(false);
    }
  };

  const signupNgo = async (email, password, ngoData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(userCredential.user, true);
      localStorage.setItem('token', token);
      
      const response = await api.post('/api/register-ngo', { ...ngoData, uid: userCredential.user.uid });
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email,
        token,
        type: 'ngo'
      };
      
      updateAuthUser(userData);
      refreshRecommendations();
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
      
      const response = await api.post('/api/register-individual', { ...individualData, uid: userCredential.user.uid });
      
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email,
        token,
        type: 'individual'
      };
      
      updateAuthUser(userData);
      refreshRecommendations();
      return userData;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await getIdToken(firebaseUser, true);
          if (!token) throw new Error('No token available');
          
          localStorage.setItem('token', token);
          
          const storedUser = JSON.parse(localStorage.getItem('user'));
          let userData;
          
          try {
            if (storedUser?.type === 'ngo') {
              userData = await fetchNgoProfile(firebaseUser);
            } else {
              userData = await fetchIndividualProfile(firebaseUser);
            }
            
            updateAuthUser(userData);
            refreshRecommendations();
          } catch (profileError) {
            console.error('Profile fetch failed:', profileError);
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
  }, [fetchNgoProfile, fetchIndividualProfile, logout, refreshRecommendations, updateAuthUser]);

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
    api,
    refreshRecommendations,
    refreshTrigger
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Create axios instance with interceptors for automatic token refresh
const createAuthenticatedAxios = (getFreshToken, logout) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const token = await getFreshToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      logout();
      return Promise.reject(error);
    }
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && 
          !originalRequest._retry && 
          !originalRequest.url?.includes('login')) {
        originalRequest._retry = true;
        
        try {
          const newToken = await getFreshToken();
          if (!newToken) {
            logout();
            return Promise.reject(new Error('Authentication failed'));
          }
          
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          logout();
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}