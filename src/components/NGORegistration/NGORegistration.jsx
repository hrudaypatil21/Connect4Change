import React, { useState } from 'react';
import './NGORegistration.css';
import { Link } from 'react-router-dom';
import NGODashboard from '../NGODashboard/NGODashboard';

const NGORegistration = () => {
  const [formData, setFormData] = useState({
    orgName: '',
    regNumber: '',
    orgEmail: '',
    orgPhone: '',
    orgAddress: '',
    orgMission: '',
    volNeeds: '',
    verificationDocs: null,
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      verificationDocs: e.target.files[0]
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
        <h1 className="form-title">Register as NGO</h1>
        
        <form onSubmit={handleSubmit}>
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
            />
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
            />
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
            />
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
            />
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
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="volNeeds">Volunteer Needs</label>
            <textarea
              id="volNeeds"
              name="volNeeds"
              value={formData.volNeeds}
              onChange={handleChange}
              placeholder="What kind of volunteers are you looking for? What skills do you need?"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="verificationDocs">Verification Documents</label>
            <p className="file-description">Please upload documents to verify your NGO status (registration certificate, etc.)</p>
            <input
              type="file"
              id="verificationDocs"
              name="verificationDocs"
              onChange={handleFileChange}
              className="file-input"
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
          <Link to="/ngo-dashboard"> 
            <button type="submit" className="submit-button ngo-button">
              Register Organization
            </button>
          </Link>
        </form>
        
        <div className="login-link">
          Already registered? <a href="#" className="ngo-link">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default NGORegistration;
