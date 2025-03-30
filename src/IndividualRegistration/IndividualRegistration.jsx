import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IndividualRegistration.css';

const IndividualRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    skills: '',
    interests: '',
    availability: 'occasionally',
    location: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullname.trim()) newErrors.fullname = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.skills.trim()) newErrors.skills = 'Skills are required';
    if (!formData.interests.trim()) newErrors.interests = 'Interests are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert skills and interests to arrays
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      const interestsArray = formData.interests.split(',').map(interest => interest.trim()).filter(interest => interest);
      
      const response = await fetch('http://127.0.0.1:8000/api/register/individual/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.fullname.split(' ')[0],
          last_name: formData.fullname.split(' ').slice(1).join(' '),
          password: formData.password,
          confirm_password: formData.confirmPassword,
          location: formData.location,
          skills: skillsArray,
          interests: interestsArray,
          availability: formData.availability
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        // Handle backend validation errors
        if (data.email) {
          setErrors(prev => ({ ...prev, email: data.email[0] }));
        }
        console.error('Registration failed:', data);
        alert(data.detail || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1 className="form-title">Join as Individual</h1>
        
        <form onSubmit={handleSubmit} noValidate>
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
              className={errors.fullname ? 'error' : ''}
            />
            {errors.fullname && <span className="error-message">{errors.fullname}</span>}
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
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your city/country"
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
              placeholder="Create a password (min 8 characters)"
              required
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
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
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills & Expertise</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List your skills separated by commas (e.g., teaching, web development, cooking)"
              required
              className={errors.skills ? 'error' : ''}
            />
            {errors.skills && <span className="error-message">{errors.skills}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="interests">Interests & Causes</label>
            <textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="List your interests separated by commas (e.g., education, environment, animal welfare)"
              required
              className={errors.interests ? 'error' : ''}
            />
            {errors.interests && <span className="error-message">{errors.interests}</span>}
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
          
          <button 
            type="submit" 
            className="submit-button individual-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default IndividualRegistration;