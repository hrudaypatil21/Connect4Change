import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './header.css';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Changed from currentUser to user

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Safely get user display name
  const getUserDisplayName = () => {
    if (!user) return 'User';
    return user.name || user.orgName || 'User';
  };

  return (
    <nav className="navigation">
      <div className="container nav-container">
        <div className="logo-container">
          <img src="/api/placeholder/40/40" alt="Logo" className="logo-image" />
          <span className="logo-text">Connect4Change</span>
        </div>
        <div className="main-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/projects-match" className="nav-link">Recommend</Link>
          <Link to="/ngos" className="nav-link">NGOs</Link>
          <Link to="/volunteers-page" className="nav-link">Volunteers</Link>
          <Link to="/sdg-cards" className="nav-link">About SDGs</Link>

        </div>
        <div className="nav-actions">
          {user ? (
            <div className="user-dropdown-container">
              <button className="user-profile-button" onClick={toggleDropdown}>
                <span className="user-avatar">
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{getUserDisplayName()}</span>
                <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`}></i>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link 
                    to={user.type === 'individual' ? '/volunteer-dashboard' : '/ngo-dashboard'} 
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="fas fa-tachometer-alt"></i> Dashboard
                  </Link>
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    <i className="fas fa-user"></i> My Profile
                  </Link>
                  <button 
                    className="dropdown-item logout-button"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin">
              <button className="signin-button">Sign In</button>
            </Link>
          )}
          <button className="mobile-menu-button">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;