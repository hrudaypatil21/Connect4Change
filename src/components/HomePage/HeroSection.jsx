import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Connect. Collaborate. Create Impact.</h1>
          <p className="hero-description">Join the platform that connects passionate individuals, teams, and NGOs to create meaningful impact and achieve Sustainable Development Goals together.</p>
          <div className="hero-buttons">
            <Link to="/individual-registration">
              <button className="primary-button">Join as Individual</button>
            </Link>
            <Link to="/ngo-registration">
              <button className="secondary-button">Register NGO</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img src="src/assets/images/connect4change.jpeg" alt="Collaboration illustration" />
      </div>
    </section>
  );
};