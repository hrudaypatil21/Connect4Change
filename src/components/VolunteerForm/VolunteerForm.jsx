import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VolunteerForm.css'; // Make sure to create this CSS file

function VolunteerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    interests: '',
    availability: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the data to your backend
    console.log('Volunteer data submitted:', formData);
    
    // Show success message and redirect
    alert('Thank you for volunteering! We will contact you soon.');
    navigate('/');
  };

  return (
    <div className="container">
      <h1 className="page-title">Volunteer Form</h1>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
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
              placeholder="Enter your phone number"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills & Qualifications</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="List any relevant skills, qualifications, or certifications"
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="interests">Areas of Interest *</label>
            <select
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              required
            >
              <option value="">Select your area of interest</option>
              <option value="education">Education</option>
              <option value="environment">Environment</option>
              <option value="healthcare">Healthcare</option>
              <option value="community">Community Development</option>
              <option value="technology">Technology</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="availability">Availability *</label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
            >
              <option value="">Select your availability</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
              <option value="evenings">Evenings</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">Previous Volunteer Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Tell us about any previous volunteer experience"
              rows="4"
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-btn">Submit Application</button>
            <button type="button" className="cancel-btn" onClick={() => navigate('/ngo-dashboard')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VolunteerForm;
