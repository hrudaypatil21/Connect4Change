import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { API_BASE_URL } from '../../config/api';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login-Ngo.css';

const LoginNgo = () => {
  const navigate = useNavigate();
  const { updateAuthUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    try {
      // 1. Authenticate with Firebase
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      // 2. Get the ID token
      const firebaseToken = await userCredential.user.getIdToken();
  
      // 3. Verify with backend and get complete NGO profile
      const response = await axios.post(
        `${API_BASE_URL}/api/login-ngo`,
        { email: formData.email },
        {
          headers: { 
            Authorization: `Bearer ${firebaseToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      // 4. Store complete user data with explicit type
      const userData = {
        ...response.data,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token: firebaseToken,
        type: 'ngo' // Explicit type
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', firebaseToken);
      
      // 5. Update context and redirect
      updateAuthUser(userData);
      navigate("/ngo-dashboard");
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login as NGO</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        
        <div className="login-link">
          Don't have an account? <Link to="/ngo-registration">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginNgo;