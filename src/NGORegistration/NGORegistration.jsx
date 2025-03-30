import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NGORegistration.css';

const NGORegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgName: '',
    regNumber: '',
    orgEmail: '',
    orgPhone: '',
    orgAddress: '',
    orgMission: '',
    orgWebsite: '',
    volNeeds: '',
    verificationDocs: null,
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrors(prev => ({ ...prev, verificationDocs: 'File size should be less than 5MB' }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        verificationDocs: file
      }));
      if (errors.verificationDocs) {
        setErrors(prev => ({ ...prev, verificationDocs: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.orgName.trim()) newErrors.orgName = 'Organization name is required';
    if (!formData.regNumber.trim()) newErrors.regNumber = 'Registration number is required';
    if (!formData.orgEmail.trim()) {
      newErrors.orgEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.orgEmail)) {
      newErrors.orgEmail = 'Invalid email format';
    }
    if (!formData.orgPhone.trim()) newErrors.orgPhone = 'Phone number is required';
    if (!formData.orgAddress.trim()) newErrors.orgAddress = 'Address is required';
    if (!formData.orgMission.trim()) newErrors.orgMission = 'Mission statement is required';
    if (!formData.volNeeds.trim()) newErrors.volNeeds = 'Volunteer needs are required';
    if (!formData.verificationDocs) newErrors.verificationDocs = 'Verification documents are required';
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const formPayload = new FormData();
      formPayload.append('org_name', formData.orgName);
      formPayload.append('reg_number', formData.regNumber);
      formPayload.append('email', formData.orgEmail);
      formPayload.append('org_phone', formData.orgPhone);
      formPayload.append('org_address', formData.orgAddress);
      formPayload.append('org_mission', formData.orgMission);
      if (formData.orgWebsite) {
        formPayload.append('org_website', formData.orgWebsite);
      }
      formPayload.append('vol_needs', formData.volNeeds.split(',').map(v => v.trim()).filter(v => v));
      formPayload.append('verification_docs', formData.verificationDocs);
      formPayload.append('password', formData.password);
      formPayload.append('confirm_password', formData.confirmPassword);
      
      const response = await fetch('http://127.0.0.1:8000/api/register/ngo/', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! Your NGO account is pending verification.');
        navigate('/login');
      } else {
        // Handle backend validation errors
        if (data.email) {
          setErrors(prev => ({ ...prev, orgEmail: data.email[0] }));
        }
        if (data.reg_number) {
          setErrors(prev => ({ ...prev, regNumber: data.reg_number[0] }));
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
        <h1 className="form-title">Register as NGO</h1>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="orgName">Organization Name</label>
            <input
              type="text"
              id="orgName"
              name="orgName"
              value={formData.orgName}
              onChange={handleChange}
              placeholder="Enter your organization's name"
              required
              className={errors.orgName ? 'error' : ''}
            />
            {errors.orgName && <span className="error-message">{errors.orgName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="regNumber">Registration Number</label>
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              placeholder="Enter registration/charity number"
              required
              className={errors.regNumber ? 'error' : ''}
            />
            {errors.regNumber && <span className="error-message">{errors.regNumber}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="orgEmail">Organization Email</label>
            <input
              type="email"
              id="orgEmail"
              name="orgEmail"
              value={formData.orgEmail}
              onChange={handleChange}
              placeholder="Enter your organization's email address"
              required
              className={errors.orgEmail ? 'error' : ''}
            />
            {errors.orgEmail && <span className="error-message">{errors.orgEmail}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="orgPhone">Contact Phone</label>
            <input
              type="tel"
              id="orgPhone"
              name="orgPhone"
              value={formData.orgPhone}
              onChange={handleChange}
              placeholder="Enter contact phone number"
              required
              className={errors.orgPhone ? 'error' : ''}
            />
            {errors.orgPhone && <span className="error-message">{errors.orgPhone}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="orgAddress">Organization Address</label>
            <textarea
              id="orgAddress"
              name="orgAddress"
              value={formData.orgAddress}
              onChange={handleChange}
              placeholder="Enter your organization's address"
              required
              className={errors.orgAddress ? 'error' : ''}
            />
            {errors.orgAddress && <span className="error-message">{errors.orgAddress}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="orgWebsite">Website (Optional)</label>
            <input
              type="url"
              id="orgWebsite"
              name="orgWebsite"
              value={formData.orgWebsite}
              onChange={handleChange}
              placeholder="Enter your organization's website"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="orgMission">Mission & Focus Areas</label>
            <textarea
              id="orgMission"
              name="orgMission"
              value={formData.orgMission}
              onChange={handleChange}
              placeholder="Describe your organization's mission and main focus areas"
              required
              className={errors.orgMission ? 'error' : ''}
            />
            {errors.orgMission && <span className="error-message">{errors.orgMission}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="volNeeds">Volunteer Needs</label>
            <textarea
              id="volNeeds"
              name="volNeeds"
              value={formData.volNeeds}
              onChange={handleChange}
              placeholder="List needed volunteer skills separated by commas (e.g., teaching, web development, marketing)"
              required
              className={errors.volNeeds ? 'error' : ''}
            />
            {errors.volNeeds && <span className="error-message">{errors.volNeeds}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="verificationDocs">Verification Documents</label>
            <p className="file-description">
              Please upload documents to verify your NGO status (registration certificate, etc.)
              <br />Max file size: 5MB
            </p>
            <input
              type="file"
              id="verificationDocs"
              name="verificationDocs"
              onChange={handleFileChange}
              className={`file-input ${errors.verificationDocs ? 'error' : ''}`}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              required
            />
            {errors.verificationDocs && (
              <span className="error-message">{errors.verificationDocs}</span>
            )}
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
          
          <button 
            type="submit" 
            className="submit-button ngo-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Organization'}
          </button>
        </form>
        
        <div className="login-link">
          Already registered? <a href="/login" className="ngo-link">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default NGORegistration;