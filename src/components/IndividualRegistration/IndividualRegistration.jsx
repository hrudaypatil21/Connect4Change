import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './IndividualRegistration.css';

const IndividualRegistration = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
    interests: '',
    availability: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation could be added here
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1 className="form-title">Join as Individual</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills & Expertise</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Please list your skills (e.g., teaching, web development, cooking, etc.)"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interests">Interests & Causes</label>
            <textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="What causes are you passionate about? (e.g., education, environment, animal welfare, etc.)"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="" disabled>How often can you volunteer?</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="occasionally">Occasionally</option>
              <option value="one-time">One-time projects only</option>
            </select>
          </div>
          <Link to="/volunteer-dashboard">
          <button type="submit" className="submit-button individual-button">
            Create Account
          </button>
          </Link>
        </form>
        
        <div className="login-link">
          Already have an account? <a href="#">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default IndividualRegistration;