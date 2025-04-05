import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./NGORegistration.css";

const NGORegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    orgName: "",
    regNumber: "",
    email: "",
    phone: "",
    address: "",
    mission: "",
    website: "",
    volNeeds: [], 
    password: "",
    confirmPassword: "",
  });

  const [verificationDocs, setVerificationDocs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleVolNeedsChange = (e) => {
    const volNeedsArray = e.target.value.split(',').map(need => need.trim());
    setFormData(prevState => ({
      ...prevState,
      volNeeds: volNeedsArray
    }));
  };

  const handleFileChange = (e) => {
    setVerificationDocs(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    try {
      setIsLoading(true);


      const formDataToSend = new FormData();
      formDataToSend.append("orgName", formData.orgName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("regNumber", formData.regNumber);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("phone", formData.phone || "");
      formDataToSend.append("address", formData.address || "");
      formDataToSend.append("mission", formData.mission || "");
      formDataToSend.append("website", formData.website || "");
      formDataToSend.append("volNeeds", JSON.stringify(formData.volNeeds));

      if (verificationDocs) {
        formDataToSend.append("verificationDocs", verificationDocs);
      }

      const response = await axios.post("http://localhost:8081/api/register-ngo", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          }, 
          transformRequest: (data) => data
        });

      localStorage.setItem('ngo', JSON.stringify(response.data));
      navigate("/ngo-dashboard");
      
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setError(error.response?.data?.error || 'Registration failed. Please check your details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h1 className="form-title">Register as NGO</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="orgName">Organization Name*</label>
            <input 
              type="text" 
              id="orgName" 
              name="orgName" 
              value={formData.orgName}
              onChange={handleChange} 
              placeholder="Enter your org name" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="regNumber">Registration Number*</label>
            <input type="text" id="regNumber" name="regNumber" value={formData.regNumber} 
            onChange={handleChange} placeholder="Enter your reg number" required/>
          </div>

          <div className="form-group">
            <label htmlFor="email">Organization Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number" required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address" required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mission">Mission Statement</label>
            <textarea
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              placeholder="Describe your mission" required
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL" 
            />
          </div>

          {/* Volunteer Needs */}
          <div className="form-group">
            <label htmlFor="volNeeds">Volunteer Needs (comma separated)</label>
            <input
              type="text"
              id="volNeeds"
              name="volNeeds"
              value={formData.volNeeds.join(', ')}
              onChange={handleVolNeedsChange}
              placeholder="teaching, mentoring, cleaning, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="verificationDocs">Verification Documents*</label>
            <input
              type="file"
              id="verificationDocs"
              name="verificationDocs"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password" required minLength="8"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password*</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password" required minLength="8"
            />
          </div>



          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register Organization"}
          </button>
        </form>
        <div className="login-link">
          Already registered? <a href="/login-ngo" className="ngo-link">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default NGORegistration;
