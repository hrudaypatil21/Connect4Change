import React from 'react';
import {Link} from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './header.css'; // Import the CSS file for the header

const Header = () => {
  return (
    <nav className="navigation">
    <div className="container nav-container">
      <div className="logo-container">
        <img src="/api/placeholder/40/40" alt="Logo" className="logo-image" />
        <span className="logo-text">Connect4Change</span>
      </div>
      <div className="main-menu">
        <a href="/" className="nav-link">Home</a>
        <a href="/projects" className="nav-link">Projects</a>
        <a href="/ngos" className="nav-link">NGOs</a>
        <a href="/volunteers-page" className="nav-link">Volunteers</a>
        <a href="/sdg-cards" className="nav-link">About SDGs</a>
      </div>
      <div className="nav-actions">
       <Link to="/signin"> <button className="signin-button">Sign In</button></Link>
        <button className="mobile-menu-button">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
  );
};

export default Header;