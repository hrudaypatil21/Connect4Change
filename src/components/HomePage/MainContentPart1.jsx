import React from "react";
import "./homePage.css";

export const MainContentPart1 = () => {
  return (
    <>
      {/* SDGs Section */}
      <section className="sdgs-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Supporting All Sustainable Development Goals</h2>
            <h4 className="section-description">Our platform focuses particularly on SDG 17 (Partnerships), SDG 4 (Quality Education), and SDG 8 (Decent Work and Economic Growth).</h4>
          </div>
          <div className="sdgs-grid">
            <div className="sdg-item sdg-1">
              <span className="sdg-text">SDG 1</span>
            </div>
            <div className="sdg-item sdg-2">
              <span className="sdg-text">SDG 2</span>
            </div>
            <div className="sdg-item sdg-3">
              <span className="sdg-text">SDG 3</span>
            </div>
            <div className="sdg-item sdg-4">
              <span className="sdg-text">SDG 4</span>
            </div>
            <div className="sdg-item sdg-5">
              <span className="sdg-text">SDG 5</span>
            </div>
            <div className="sdg-item sdg-6">
              <span className="sdg-text">SDG 6</span>
            </div>
          </div>
        </div>
      </section>	

      {/* Core Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Core Features</h2>
            <h4 className="section-description">Our platform streamlines collaboration between individuals, teams, and NGOs with these powerful tools.</h4>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-blue">
                <i className="fas fa-brain"></i>
              </div>
              <h3 className="feature-title">Smart Matching</h3>
              <p className="feature-description">Our AI-driven system connects users, teams, and NGOs based on skills, interests, and project needs, ensuring optimal contribution alignment.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-green">
                <i className="fas fa-comments"></i>
              </div>
              <h3 className="feature-title">Seamless Communication</h3>
              <p className="feature-description">Integrated messaging, discussion forums, and notifications facilitate real-time interaction, making collaboration smoother and more efficient.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon feature-icon-purple">
                <i className="fas fa-tasks"></i>
              </div>
              <h3 className="feature-title">Project Management</h3>
              <p className="feature-description">Comprehensive tools for task-tracking, milestone setting, and impact measurement allow teams to organize workflows and track progress efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <h4 className="section-description">A simple process to connect, collaborate and create impact together.</h4>
          </div>
          
          <div className="steps-grid">
            <div className="step-item">
              <div className="step-number">
                <span>1</span>
              </div>
              <h3 className="step-title">Create Profile</h3>
              <p className="step-description">Sign up and build your profile with your skills, interests, and availability.</p>
            </div>
            
            <div className="step-item">
              <div className="step-number">
                <span>2</span>
              </div>
              <h3 className="step-title">Find Projects</h3>
              <p className="step-description">Browse SDG projects or get AI-recommended matches based on your profile.</p>
            </div>
            
            <div className="step-item">
              <div className="step-number">
                <span>3</span>
              </div>
              <h3 className="step-title">Collaborate</h3>
              <p className="step-description">Connect with teams and NGOs to plan and execute projects together.</p>
            </div>
            
            <div className="step-item">
              <div className="step-number">
                <span>4</span>
              </div>
              <h3 className="step-title">Track Impact</h3>
              <p className="step-description">Monitor progress, celebrate milestones, and showcase your contribution.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};