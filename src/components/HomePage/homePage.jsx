import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";

export default function HomePage() {
  return (
    <>


  {/* Hero Section */}
  <section class="hero-section">
    <div class="container hero-container">
      <div class="hero-content">
        <h1 class="hero-title">Connect. Collaborate. Create Impact.</h1>
        <p class="hero-description">Join the platform that connects passionate individuals, teams, and NGOs to create meaningful impact and achieve Sustainable Development Goals together.</p>
        <div class="hero-buttons">
         <Link to="/individual-registration">
          <button class="primary-button">Join as Individual</button>
          </Link>
          <Link to="/ngo-registration">
          <button class="secondary-button">Register NGO</button>
          </Link>
        </div>
      </div>
    </div>
    <div class="hero-image">
      <img src="api/placeholder/600/400"
 alt="Collaboration illustration" />
    </div>
  </section>

  {/* SDGs Section */}
  <section class="sdgs-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Supporting All Sustainable Development Goals</h2>
        <p class="section-description">Our platform focuses particularly on SDG 17 (Partnerships), SDG 4 (Quality Education), and SDG 8 (Decent Work and Economic Growth).</p>
      </div>
      <div class="sdgs-grid">
        {/* SDG Icons - Placeholders */}
        <div class="sdg-item sdg-1">
          <span class="sdg-text">SDG 1</span>
        </div>
        <div class="sdg-item sdg-2">
          <span class="sdg-text">SDG 2</span>
        </div>
        <div class="sdg-item sdg-3">
          <span class="sdg-text">SDG 3</span>
        </div>
        <div class="sdg-item sdg-4">
          <span class="sdg-text">SDG 4</span>
        </div>
        <div class="sdg-item sdg-5">
          <span class="sdg-text">SDG 5</span>
        </div>
        <div class="sdg-item sdg-6">
          <span class="sdg-text">SDG 6</span>
        </div>
        {/* Additional SDGs would continue here */}
      </div>
    </div>
  </section>	

  {/* Core Features Section */}
  <section class="features-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Core Features</h2>
        <p class="section-description">Our platform streamlines collaboration between individuals, teams, and NGOs with these powerful tools.</p>
      </div>
      
      <div class="features-grid">
        {/* Smart Matching */}
        <div class="feature-card">
          <div class="feature-icon feature-icon-blue">
            <i class="fas fa-brain"></i>
          </div>
          <h3 class="feature-title">Smart Matching</h3>
          <p class="feature-description">Our AI-driven system connects users, teams, and NGOs based on skills, interests, and project needs, ensuring optimal contribution alignment.</p>
        </div>
        
        {/* Seamless Communication */}
        <div class="feature-card">
          <div class="feature-icon feature-icon-green">
            <i class="fas fa-comments"></i>
          </div>
          <h3 class="feature-title">Seamless Communication</h3>
          <p class="feature-description">Integrated messaging, discussion forums, and notifications facilitate real-time interaction, making collaboration smoother and more efficient.</p>
        </div>
        
        {/* Project Management */}
        <div class="feature-card">
          <div class="feature-icon feature-icon-purple">
            <i class="fas fa-tasks"></i>
          </div>
          <h3 class="feature-title">Project Management</h3>
          <p class="feature-description">Comprehensive tools for task-tracking, milestone setting, and impact measurement allow teams to organize workflows and track progress efficiently.</p>
        </div>
      </div>
    </div>
  </section>

  {/* How It Works Section */}
  <section class="how-it-works-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">How It Works</h2>
        <p class="section-description">A simple process to connect, collaborate and create impact together.</p>
      </div>
      
      <div class="steps-grid">
        {/* Step 1 */}
        <div class="step-item">
          <div class="step-number">
            <span>1</span>
          </div>
          <h3 class="step-title">Create Profile</h3>
          <p class="step-description">Sign up and build your profile with your skills, interests, and availability.</p>
        </div>
        
        {/* Step 2 */}
        <div class="step-item">
          <div class="step-number">
            <span>2</span>
          </div>
          <h3 class="step-title">Find Projects</h3>
          <p class="step-description">Browse SDG projects or get AI-recommended matches based on your profile.</p>
        </div>
        
        {/* Step 3 */}
        <div class="step-item">
          <div class="step-number">
            <span>3</span>
          </div>
          <h3 class="step-title">Collaborate</h3>
          <p class="step-description">Connect with teams and NGOs to plan and execute projects together.</p>
        </div>
        
        {/* Step 4 */}
        <div class="step-item">
          <div class="step-number">
            <span>4</span>
          </div>
          <h3 class="step-title">Track Impact</h3>
          <p class="step-description">Monitor progress, celebrate milestones, and showcase your contribution.</p>
        </div>
      </div>
    </div>
  </section>

  {/* Projects Showcase */}
  <section class="projects-section">
    <div class="container">
      <div class="section-header-with-link">
        <div>
          <h2 class="section-title">Ongoing Projects</h2>
          <p class="section-description">Join these impactful initiatives or start your own.</p>
        </div>
        <a href="#" class="see-all-link">See all projects</a>
      </div>
      
      <div class="projects-grid">
        {/* Project Card 1 */}
        <div class="project-card">
          <img src="/api/placeholder/400/200" alt="Project Image" class="project-image" />
          <div class="project-content">
            <div class="project-tags">
              <span class="tag tag-blue">SDG 4</span>
              <span class="tag tag-green">SDG 17</span>
            </div>
            <h3 class="project-title">Digital Literacy for Rural Schools</h3>
            <p class="project-description">Providing computer training and digital skills to children in underserved rural communities.</p>
            <div class="project-footer">
              <span class="volunteers-needed">5 volunteers needed</span>
              <button class="join-button">Join</button>
            </div>
          </div>
        </div>
        
        {/* Project Card 2 */}
        <div class="project-card">
          <img src="/api/placeholder/400/200" alt="Project Image" class="project-image"/>
          <div class="project-content">
            <div class="project-tags">
              <span class="tag tag-yellow">SDG 8</span>
              <span class="tag tag-green">SDG 17</span>
            </div>
            <h3 class="project-title">Microentrepreneur Mentorship</h3>
            <p class="project-description">Connecting business professionals with local entrepreneurs to provide guidance and support for sustainable businesses.</p>
            <div class="project-footer">
              <span class="volunteers-needed">3 volunteers needed</span>
              <button class="join-button">Join</button>
            </div>
          </div>
        </div>
        
        {/* Project Card 3 */}
        <div class="project-card">
          <img src="/api/placeholder/400/200" alt="Project Image" class="project-image"/>
          <div class="project-content">
            <div class="project-tags">
              <span class="tag tag-red">SDG 3</span>
              <span class="tag tag-green">SDG 17</span>
            </div>
            <h3 class="project-title">Community Health Awareness</h3>
            <p class="project-description">Organizing health camps and awareness programs in underserved communities about preventive healthcare.</p>
            <div class="project-footer">
              <span class="volunteers-needed">8 volunteers needed</span>
              <button class="join-button">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* NGO Spotlight */}
  <section class="ngo-section">
    <div class="container">
      <div class="section-header-with-link">
        <div>
          <h2 class="section-title">NGO Partners</h2>
          <p class="section-description">Collaborate with these organizations working toward SDGs.</p>
        </div>
        <a href="#" class="see-all-link">See all NGOs</a>
      </div>
      
      <div class="ngo-grid">
        {/* NGO Card 1 */}
        <div class="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" class="ngo-logo" />
          <h3 class="ngo-title">Education First</h3>
          <p class="ngo-description">Promoting quality education in underserved communities</p>
          <div class="ngo-tags">
            <span class="tag tag-blue">SDG 4</span>
          </div>
          <button class="view-projects-button">View Projects</button>
        </div>
        
        {/* NGO Card 2 */}
        <div class="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" class="ngo-logo"/>
          <h3 class="ngo-title">Green Earth</h3>
          <p class="ngo-description">Working towards environmental sustainability</p>
          <div class="ngo-tags">
            <span class="tag tag-green">SDG 13</span>
          </div>
          <button class="view-projects-button">View Projects</button>
        </div>
        
        {/* NGO Card 3 */}
        <div class="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" class="ngo-logo"/>
          <h3 class="ngo-title">Skill Builders</h3>
          <p class="ngo-description">Empowering youth through skills development</p>
          <div class="ngo-tags">
            <span class="tag tag-yellow">SDG 8</span>
          </div>
          <button class="view-projects-button">View Projects</button>
        </div>
        
        {/* NGO Card 4 */}
        <div class="ngo-card">
          <img src="/api/placeholder/80/80" alt="NGO Logo" class="ngo-logo"/>
          <h3 class="ngo-title">Health Matters</h3>
          <p class="ngo-description">Providing healthcare access to underserved populations</p>
          <div class="ngo-tags">
            <span class="tag tag-red">SDG 3</span>
          </div>
          <button class="view-projects-button">View Projects</button>
        </div>
      </div>
    </div>
  </section>

  {/* Testimonials Section */}
  <section class="testimonials-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Success Stories</h2>
        <p class="section-description">Hear from volunteers and NGOs who have created impact together.</p>
      </div>
      
      <div class="testimonials-grid">
        {/* Testimonial 1 */}
        <div class="testimonial-card">
          <div class="testimonial-header">
            <img src="/api/placeholder/64/64" alt="User Avatar" class="testimonial-avatar" />
            <div>
              <h3 class="testimonial-name">Priya Sharma</h3>
              <p class="testimonial-role">Volunteer, Digital Skills Mentor</p>
            </div>
          </div>
          <p class="testimonial-text">"Connect4Change made it easy for me to find an education project that matched my tech skills. I've been teaching digital literacy to rural students for 6 months now, and the platform's project management tools have been invaluable for coordinating with the NGO team."</p>
        </div>
        
        {/* Testimonial 2 */}
        <div class="testimonial-card">
          <div class="testimonial-header">
            <img src="/api/placeholder/64/64" alt="User Avatar" class="testimonial-avatar"/>
            <div>
              <h3 class="testimonial-name">Ramesh Patel</h3>
              <p class="testimonial-role">Director, Education First NGO</p>
            </div>
          </div>
          <p class="testimonial-text">"The smart matching system helped us find skilled volunteers who were truly passionate about our cause. We've been able to expand our educational programs to three new communities because of the dedicated team we assembled through Connect4Change."</p>
        </div>
      </div>
    </div>
  </section>

  {/* Call to Action */}
  <section class="cta-section">
    <div class="container">
      <h2 class="cta-title">Ready to Make a Difference?</h2>
      <p class="cta-description">Join Connect4Change today and start collaborating for the Sustainable Development Goals.</p>
      <div class="cta-buttons">
        <button class="cta-primary-button">Sign Up Now</button>
        <button class="cta-secondary-button">Learn More</button>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <div class="footer-logo">
            <img src="/api/placeholder/40/40" alt="Logo" class="logo-image"/>
            <span class="logo-text">Connect4Change</span>
          </div>
          <p class="footer-description">Connecting passionate individuals and NGOs to create meaningful impact and achieve Sustainable Development Goals together.</p>
        </div>
        
        <div class="footer-links">
          <h3 class="footer-heading">Quick Links</h3>
          <ul class="footer-list">
            <li><a href="#" class="footer-link">Home</a></li>
            <li><a href="#" class="footer-link">Projects</a></li>
            <li><a href="#" class="footer-link">NGOs</a></li>
            <li><a href="#" class="footer-link">Volunteers</a></li>
            <li><a href="#" class="footer-link">About SDGs</a></li>
          </ul>
        </div>
        
        <div class="footer-resources">
          <h3 class="footer-heading">Resources</h3>
          <ul class="footer-list">
            <li><a href="#" class="footer-link">How It Works</a></li>
            <li><a href="#" class="footer-link">Success Stories</a></li>
            <li><a href="#" class="footer-link">Blog</a></li>
            <li><a href="#" class="footer-link">FAQ</a></li>
            <li><a href="#" class="footer-link">Contact Us</a></li>
          </ul>
        </div>
        
        <div class="footer-connect">
          <h3 class="footer-heading">Stay Connected</h3>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          </div>
          <p class="newsletter-label">Subscribe to our newsletter</p>
          <div class="newsletter-form">
            <input type="email" placeholder="Your email" class="newsletter-input"/>
            <button class="newsletter-button">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div class="footer-copyright">
        <p>&copy; 2025 Connect4Change. All rights reserved.</p>
      </div>
    </div>
  </footer>	
    </>
  );
}