import React from 'react';
import './VolunteersPage.css'; // We'll create this CSS file separately

// Main Volunteers Page Component
const VolunteersPage = () => {
  // Sample volunteer data
  const volunteers = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "src/assets/images/sarah.jpg",
      role: "Education specialist with 5 years of experience in curriculum development.",
      sdgs: [{ id: 4, name: "Quality Education" }],
      skills: ["Teaching", "Mentoring", "Curriculum Design"]
    },
    {
      id: 2,
      name: "Miguel Rodriguez",
      image: "src/assets/images/miguel.webp",
      role: "Environmental engineer focused on sustainable urban development.",
      sdgs: [
        { id: 11, name: "Sustainable Cities and Communities" },
        { id: 13, name: "Climate Action" }
      ],
      skills: ["Engineering", "Urban Planning", "Sustainability"]
    },
    {
      id: 3,
      name: "Aisha Patel",
      image: "src/assets/images/aisha.webp",
      role: "Community organizer with experience in grassroots initiatives.",
      sdgs: [{ id: 17, name: "Partnerships for the Goals" }],
      skills: ["Coordination", "Fundraising", "Community Engagement"]
    }
  ];

  // SDGs data
  const sdgs = [
    { id: 1, name: "No Poverty" },
    { id: 2, name: "Zero Hunger" },
    { id: 3, name: "Good Health and Well-being" },
    { id: 4, name: "Quality Education" },
    { id: 5, name: "Gender Equality" },
    { id: 6, name: "Clean Water and Sanitation" },
    { id: 7, name: "Affordable and Clean Energy" },
    { id: 8, name: "Decent Work and Economic Growth" },
    { id: 9, name: "Industry, Innovation, and Infrastructure" },
    { id: 10, name: "Reduced Inequalities" },
    { id: 11, name: "Sustainable Cities and Communities" },
    { id: 12, name: "Responsible Consumption and Production" },
    { id: 13, name: "Climate Action" },
    { id: 14, name: "Life Below Water" },
    { id: 15, name: "Life on Land" },
    { id: 16, name: "Peace, Justice and Strong Institutions" },
    { id: 17, name: "Partnerships for the Goals" }
  ];

  return (
    <div className="container">
      {/* Header */}
      {/* <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Connect4Change Logo" />
          <span className="logo-text">Connect4Change</span>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/ngos">NGOs</a></li>
            <li><a href="/volunteers" className="active">Volunteers</a></li>
            <li><a href="/about-sdgs">About SDGs</a></li>
          </ul>
        </nav>
        
        <a href="/signin" className="sign-in-btn">Sign In</a>
      </header> */}
      
      {/* Main Content */}
      <div className="main-content">
        <h1 className="page-title">Our Volunteer Community</h1>
        
        {/* SDG Navigation */}
        <div className="sdg-navigation">
          <span className="all-sdgs">All Goals:</span>
          <div className="sdg-links">
            {sdgs.map(sdg => (
              <a 
                href={`#sdg-${sdg.id}`} 
                key={sdg.id} 
                className={`sdg-tag sdg-${sdg.id}`}
              >
                SDG {sdg.id}: {sdg.name}
              </a>
            ))}
          </div>
        </div>
        
        {/* Volunteer Cards */}
        <div className="volunteer-grid">
          {volunteers.map(volunteer => (
            <VolunteerCard key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Volunteer Card Component
const VolunteerCard = ({ volunteer }) => {
  return (
    <div className="volunteer-card">
      <img 
        src={volunteer.image} 
        alt={volunteer.name} 
        className="volunteer-image" 
      />
      <div className="volunteer-details">
        <h2 className="volunteer-name">{volunteer.name}</h2>
        <p className="volunteer-role">{volunteer.role}</p>
        
        <div className="volunteer-sdgs">
          {volunteer.sdgs.map(sdg => (
            <span 
              key={sdg.id} 
              className={`volunteer-sdg-tag sdg-${sdg.id}`}
            >
              SDG {sdg.id}
            </span>
          ))}
        </div>
        
        <div className="volunteer-skills">
          {volunteer.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteersPage;