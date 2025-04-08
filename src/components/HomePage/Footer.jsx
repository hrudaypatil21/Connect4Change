import React from "react";
import "./homePage.css";

export const FooterSection = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <img src="/api/placeholder/40/40" alt="Logo" className="logo-image"/>
              <span className="logo-text">Connect4Change</span>
            </div>
            <p className="footer-description">Connecting passionate individuals and NGOs to create meaningful impact and achieve Sustainable Development Goals together.</p>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Projects</a></li>
              <li><a href="#" className="footer-link">NGOs</a></li>
              <li><a href="#" className="footer-link">Volunteers</a></li>
              <li><a href="#" className="footer-link">About SDGs</a></li>
            </ul>
          </div>
          
          <div className="footer-resources">
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">How It Works</a></li>
              <li><a href="#" className="footer-link">Success Stories</a></li>
              <li><a href="#" className="footer-link">Blog</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-connect">
            <h3 className="footer-heading">Stay Connected</h3>
            <div className="social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            </div>
            <p className="newsletter-label">Subscribe to our newsletter</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" className="newsletter-input"/>
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-copyright">
          <p>&copy; 2025 Connect4Change. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};