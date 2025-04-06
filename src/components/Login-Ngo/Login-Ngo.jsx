import React, { useState } from 'react';
import './Login-Ngo.css';
import { useNavigate } from 'react-router-dom';

const LoginNGO = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgEmail: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    if (formData.orgEmail && formData.password) {
      navigate('/ngo-dashboard');
    } else {
      alert('Please enter valid credentials.');
    }
  };

  return (
    <div className="ngo-login-container">
      <form className="ngo-login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">NGO Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="orgEmail"
            value={formData.orgEmail}
            onChange={handleChange}
            required
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
          />
        </div>
        <button className="login-button" type="submit">Login</button>
        <div className="signup-redirect">
          Don’t have an account? <a href="/ngo-registration">Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginNGO;
