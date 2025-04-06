import React from 'react';
import {Link} from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './header.css'; // Import the CSS file for the header

const Header = () => {
  return (
    <nav class="navigation">
    <div class="container nav-container">
      <div class="logo-container">
        <img src="/api/placeholder/40/40" alt="Logo" class="logo-image" />
        <span class="logo-text">Connect4Change</span>
      </div>
      <div class="main-menu">
        <a href="/" class="nav-link">Home</a>
        <a href="/projects" class="nav-link">Projects</a>
        <a href="/ngos" class="nav-link">NGOs</a>
        <a href="/volunteers-page" class="nav-link">Volunteers</a>
        <a href="/sdg-cards" class="nav-link">About SDGs</a>
      </div>
      <div class="nav-actions">
       <Link to="/signin"> <button class="signin-button">Sign In</button></Link>
        <button class="mobile-menu-button">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
  );
};

export default Header;