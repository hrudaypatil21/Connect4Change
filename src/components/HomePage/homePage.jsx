import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

export default function HomePage() {
  return (
    <>


  {/* Hero Section */}
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
      <img src="/api/placeholder/500/300" alt="Collaboration illustration" />
    </div>
  </section>

  {/* SDGs Section */}
  <section className="sdgs-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Supporting All Sustainable Development Goals</h2>
        <h4 className="section-description">Our platform focuses particularly on SDG 17 (Partnerships), SDG 4 (Quality Education), and SDG 8 (Decent Work and Economic Growth).</h4>
      </div>
      <div className="sdgs-grid">
        {/* SDG Icons - Placeholders */}
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
        {/* Additional SDGs would continue here */}
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
        {/* Smart Matching */}
        <div className="feature-card">
          <div className="feature-icon feature-icon-blue">
            <i className="fas fa-brain"></i>
          </div>
          <h3 className="feature-title">Smart Matching</h3>
          <p className="feature-description">Our AI-driven system connects users, teams, and NGOs based on skills, interests, and project needs, ensuring optimal contribution alignment.</p>
        </div>
        
        {/* Seamless Communication */}
        <div className="feature-card">
          <div className="feature-icon feature-icon-green">
            <i className="fas fa-comments"></i>
          </div>
          <h3 className="feature-title">Seamless Communication</h3>
          <p className="feature-description">Integrated messaging, discussion forums, and notifications facilitate real-time interaction, making collaboration smoother and more efficient.</p>
        </div>
        
        {/* Project Management */}
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
        {/* Step 1 */}
        <div className="step-item">
          <div className="step-number">
            <span>1</span>
          </div>
          <h3 className="step-title">Create Profile</h3>
          <p className="step-description">Sign up and build your profile with your skills, interests, and availability.</p>
        </div>
        
        {/* Step 2 */}
        <div className="step-item">
          <div className="step-number">
            <span>2</span>
          </div>
          <h3 className="step-title">Find Projects</h3>
          <p className="step-description">Browse SDG projects or get AI-recommended matches based on your profile.</p>
        </div>
        
        {/* Step 3 */}
        <div className="step-item">
          <div className="step-number">
            <span>3</span>
          </div>
          <h3 className="step-title">Collaborate</h3>
          <p className="step-description">Connect with teams and NGOs to plan and execute projects together.</p>
        </div>
        
        {/* Step 4 */}
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

  {/* Projects Showcase */}
  <section className="projects-section">
    <div className="container">
      <div className="section-header-with-link">
        <div>
          <h2 className="section-title">Ongoing Projects</h2>
          <h4 className="section-description">Join these impactful initiatives or start your own.</h4>
        </div>
        <a href="#" className="see-all-link">See all projects</a>
      </div>
      
      <div className="projects-grid">
        {/* Project Card 1 */}
        <div className="project-card">
          <img src="/api/placeholder/400/200" alt="Project Image" className="project-image" />
          <div className="project-content">
            <div className="project-tags">
              <span className="tag tag-blue">SDG 4</span>
              <span className="tag tag-green">SDG 17</span>
            </div>
            <h3 className="project-title">Digital Literacy for Rural Schools</h3>
            <p className="project-description">Providing computer training and digital skills to children in underserved rural communities.</p>
            <div className="project-footer">
              <span className="volunteers-needed">5 volunteers needed</span>
              <button className="join-button">Join</button>
            </div>
          </div>
        </div>
        
        {/* Project Card 2 */}
        <div className="project-card">
          <img src="/api/placeholder/400/200" alt="Project Image" className="project-image"/>
          <div className="project-content">
            <div className="project-tags">
              <span className="tag tag-yellow">SDG 8</span>
              <span className="tag tag-green">SDG 17</span>
            </div>
            <h3 className="project-title">Microentrepreneur Mentorship</h3>
            <p className="project-description">Connecting business professionals with local entrepreneurs to provide guidance and support for sustainable businesses.</p>
            <div className="project-footer">
              <span className="volunteers-needed">3 volunteers needed</span>
              <button className="join-button">Join</button>
            </div>
          </div>
        </div>
        
        {/* Project Card 3 */}
        <div className="project-card">
          <img src="/api/placeholder/400/200" alt="Project Image" className="project-image"/>
          <div className="project-content">
            <div className="project-tags">
              <span className="tag tag-red">SDG 3</span>
              <span className="tag tag-green">SDG 17</span>
            </div>
            <h3 className="project-title">Community Health Awareness</h3>
            <p className="project-description">Organizing health camps and awareness programs in underserved communities about preventive healthcare.</p>
            <div className="project-footer">
              <span className="volunteers-needed">8 volunteers needed</span>
              <button className="join-button">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* NGO Spotlight */}
  <section className="ngo-section">
    <div className="container">
      <div className="section-header-with-link">
        <div>
          <h2 className="section-title">NGO Partners</h2>
          <h4 className="section-description">Collaborate with these organizations working toward SDGs.</h4>
        </div>
        <a href="#" className="see-all-link">See all NGOs</a>
      </div>
      
      <div className="ngo-grid">
        {/* NGO Card 1 */}
        <div className="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" className="ngo-logo" />
          <h3 className="ngo-title">Education First</h3>
          <p className="ngo-description">Promoting quality education in underserved communities</p>
          <div className="ngo-tags">
            <span className="tag tag-blue">SDG 4</span>
          </div>
          <button className="view-projects-button">View Projects</button>
        </div>
        
        {/* NGO Card 2 */}
        <div className="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" className="ngo-logo"/>
          <h3 className="ngo-title">Green Earth</h3>
          <p className="ngo-description">Working towards environmental sustainability</p>
          <div className="ngo-tags">
            <span className="tag tag-green">SDG 13</span>
          </div>
          <button className="view-projects-button">View Projects</button>
        </div>
        
        {/* NGO Card 3 */}
        <div className="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" className="ngo-logo"/>
          <h3 className="ngo-title">Skill Builders</h3>
          <p className="ngo-description">Empowering youth through skills development</p>
          <div className="ngo-tags">
            <span className="tag tag-yellow">SDG 8</span>
          </div>
          <button className="view-projects-button">View Projects</button>
        </div>
        
        {/* NGO Card 4 */}
        <div className="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" className="ngo-logo"/>
          <h3 className="ngo-title">Health Matters</h3>
          <p className="ngo-description">Providing healthcare access to underserved populations</p>
          <div className="ngo-tags">
            <span className="tag tag-red">SDG 3</span>
          </div>
          <button className="view-projects-button">View Projects</button>
        </div>
      </div>
    </div>
  </section>

  {/* Testimonials Section */}
  <section className="testimonials-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Success Stories</h2>
        <h4 className="section-description">Hear from volunteers and NGOs who have created impact together.</h4>
      </div>
      
      <div className="testimonials-grid">
        {/* Testimonial 1 */}
        <div className="testimonial-card">
          <div className="testimonial-header">
            <img src="/api/placeholder/64/64" alt="User Avatar" className="testimonial-avatar" />
            <div>
              <h3 className="testimonial-name">Priya Sharma</h3>
              <p className="testimonial-role">Volunteer, Digital Skills Mentor</p>
            </div>
          </div>
          <p className="testimonial-text">"Connect4Change made it easy for me to find an education project that matched my tech skills. I've been teaching digital literacy to rural students for 6 months now, and the platform's project management tools have been invaluable for coordinating with the NGO team."</p>
        </div>
        
        {/* Testimonial 2 */}
        <div className="testimonial-card">
          <div className="testimonial-header">
            <img src="/api/placeholder/64/64" alt="User Avatar" className="testimonial-avatar"/>
            <div>
              <h3 className="testimonial-name">Ramesh Patel</h3>
              <p className="testimonial-role">Director, Education First NGO</p>
            </div>
          </div>
          <p className="testimonial-text">"The smart matching system helped us find skilled volunteers who were truly passionate about our cause. We've been able to expand our educational programs to three new communities because of the dedicated team we assembled through Connect4Change."</p>
        </div>
      </div>
    </div>
  </section>

  {/* Call to Action */}
  <section className="cta-section">
    <div className="container">
      <h2 className="cta-title">Ready to Make a Difference?</h2>
      <h4 className="cta-description">Join Connect4Change today and start collaborating for the Sustainable Development Goals.</h4>
      <div className="cta-buttons">
        <button className="cta-primary-button">Sign Up Now</button>
        <button className="cta-secondary-button">Learn More</button>
      </div>
    </div>
  </section>

  {/* Footer */}
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
    </>
  );
}