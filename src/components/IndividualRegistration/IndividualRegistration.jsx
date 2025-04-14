import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './IndividualRegistration.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import { useAuth } from '../AuthContext';

const IndividualRegistration = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phone: '',
    address: '',
    bio: '',
    skills: [],
    interests: [],
    availability: ''
  });

  const [resume, setResume] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prevState => ({
      ...prevState,
      skills: skillsArray
    }));
  };

  const handleInterestsChange = (e) => {
    const interestsArray = e.target.value.split(',').map(interest => interest.trim());
    setFormData(prevState => ({
      ...prevState,
      interests: interestsArray
    }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setIsLoading(false);
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      
      // Append all fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('location', formData.location || '');
      formDataToSend.append('phone', formData.phone || '');
      formDataToSend.append('address', formData.address || '');
      formDataToSend.append('bio', formData.bio || '');
      
      // Stringify arrays properly
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      formDataToSend.append('interests', JSON.stringify(formData.interests));
      formDataToSend.append('availability', formData.availability);
      
      if (resume) {
        formDataToSend.append('resume', resume);
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/api/register-individual`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      navigate("/volunteer-dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data?.message || error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1 className="form-title">Join as Individual</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name}
              onChange={handleChange} placeholder="Enter your full name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="Enter your email address" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password}
              onChange={handleChange} placeholder="Create a password" required minLength="8" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
              onChange={handleChange} placeholder="Confirm your password" required minLength="8" />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" id="location" name="location" value={formData.location}
              onChange={handleChange} placeholder="Enter your location" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="Enter your phone number" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={formData.address}
              onChange={handleChange} placeholder="Enter your address" />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" name="bio" value={formData.bio}
              onChange={handleChange} placeholder="Tell us about yourself" />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills (comma separated)</label>
            <input type="text" id="skills" name="skills" value={formData.skills.join(', ')}
              onChange={handleSkillsChange} placeholder="e.g., Teaching, Web Development, Cooking" />
          </div>
          <div className="form-group">
            <label htmlFor="interests">Interests (comma separated)</label>
            <input type="text" id="interests" name="interests" value={formData.interests.join(', ')}
              onChange={handleInterestsChange} placeholder="e.g., Education, Environment, Animal Welfare" />
          </div>

          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <select id="availability" name="availability" value={formData.availability}
              onChange={handleChange} required>
              <option value="" disabled>How often can you volunteer?</option>
              <option value="ONE_TIME">One Time</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="INDEFINITE">Indefinite</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume (optional)</label>
            <input type="file" id="resume" name="resume" onChange={handleFileChange}
              accept=".pdf,.doc,.docx" />
          </div>

          <button type="submit" className="submit-button individual-button" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login-individual">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default IndividualRegistration;
