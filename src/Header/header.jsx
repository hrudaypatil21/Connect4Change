import React from 'react';
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
        <a href="#" class="nav-link">NGOs</a>
        <a href="#" class="nav-link">Volunteers</a>
        <a href="#" class="nav-link">About SDGs</a>
      </div>
      <div class="nav-actions">
        <a href="/signup" class="nav-link">Sign In</a>
        <button class="mobile-menu-button">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </nav>
  );
};

export default Header;