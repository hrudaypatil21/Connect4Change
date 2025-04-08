import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Correct path to your AuthContext
import { API_BASE_URL } from '../../config/api'; // Ensure this path is correct
import './Login-Ngo.css';

const LoginNGO = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/login-ngo`,
        formData, // Axios automatically stringifies JSON
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      
      const token = response.headers['authorization']?.split(' ')[1];
      
      if (!token) {
        throw new Error("No authentication token received");
      }
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userType', 'ngo'); // Correct user type
      
      // Update auth context
      login(response.data, token, "ngo"); // Changed from "individual" to "ngo"
      navigate("/ngo-dashboard");
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please check your credentials";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (err.response.status === 403) {
          errorMessage = "Access denied. Please contact support";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ngo-login-container">
      <form className="ngo-login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">NGO Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : "Login"}
        </button>
        
        <div className="signup-redirect">
          Don't have an account? <a href="/ngo-registration">Register here</a>
        </div>
      </form>
    </div>
  );
};

export default LoginNGO;