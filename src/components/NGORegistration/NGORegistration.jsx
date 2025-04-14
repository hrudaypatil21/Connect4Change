import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import "./NGORegistration.css";

const NGORegistration = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleVolNeedsChange = (e) => {
    const volNeedsArray = e.target.value.split(",").map((need) => need.trim());
    setFormData((prevState) => ({
      ...prevState,
      volNeeds: volNeedsArray,
    }));
  };

  const handleFileChange = (e) => {
    setVerificationDocs(e.target.files[0]);
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

      formDataToSend.append("orgName", formData.orgName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("regNumber", formData.regNumber);
      formDataToSend.append("phone", formData.phone || "");
      formDataToSend.append("address", formData.address || "");
      formDataToSend.append("mission", formData.mission || "");
      formDataToSend.append("website", formData.website || "");
      formDataToSend.append("volNeeds", JSON.stringify(formData.volNeeds));

      if (verificationDocs) {
        formDataToSend.append("verificationDocs", verificationDocs);
        
      }
      formDataToSend.append("password", formData.password);

      // 3. Register NGO in your backend
      const response = await axios.post(
        `${API_BASE_URL}/api/register-ngo`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      navigate("/ngo-dashboard");
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
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              value={formData.regNumber}
              onChange={handleChange}
              placeholder="Enter your reg number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Organization Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
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
              placeholder="Enter phone number"
              required
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
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mission">Mission Statement</label>
            <textarea
              id="mission"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              placeholder="Describe your mission"
              required
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
              value={formData.volNeeds.join(", ")}
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
              placeholder="Create a password"
              required
              minLength="8"
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
              placeholder="Confirm your password"
              required
              minLength="8"
            />
          </div>
          <button
            type="submit"
            className="submit-button individual-button"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Create Account"}
          </button>
        </form>
        <div className="login-link">
          Already have an account? <Link to="/login-ngo">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default NGORegistration;
