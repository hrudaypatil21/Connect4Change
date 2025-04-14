import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { API_BASE_URL } from '../../config/api';
import "./Login_Individual.css";

const LoginIndividual = () => {
  const navigate = useNavigate();
  const { loginIndividual, updateAuthUser } = useAuth(); // Correct hook usage inside component
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // 1. Firebase authentication
      const userCredential = await loginIndividual(formData.email, formData.password, 'individual');
      const firebaseToken = await userCredential.user.getIdToken();
  
      // 2. Backend verification
      const response = await axios.post(
        `${API_BASE_URL}/api/login-individual`,
        {}, // Empty body
        {
          headers: { 
            'Authorization': `Bearer ${firebaseToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      // 3. Store user data
      const userData = {
        ...response.data,
        token: firebaseToken,
        type: 'individual'
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', firebaseToken);
      
      // 4. Update auth context
      updateAuthUser(userData);
  
      // 5. Redirect to dashboard
      navigate("/volunteer-dashboard");
      
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
        <h2 className="login-title">Login as Individual</h2>
        {error && <div className="error-message">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="login-link">
          Don't have an account? <Link to="/individual-registration">Register here</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginIndividual;