import React from "react";
import "./homePage.css";

export const MainContentPart2 = () => {
  return (
    <>
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
            <div className="project-card">
              <img src="src/assets/images/digital litracy for rural areas.jpg" alt="Project Image" className="project-image" />
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
            
            <div className="project-card">
              <img src="src/assets/images/Micro entrepreneur Mentorship.jpg" alt="Project Image" className="project-image"/>
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
            
            <div className="project-card">
              <img src="src/assets/images/Community Health Awareness.jpg" alt="Project Image" className="project-image"/>
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
            <div className="ngo-card">
              <img src="src/assets/images/education fisrt.jpg" alt="NGO Logo" className="ngo-logo" />
              <h3 className="ngo-title">Education First</h3>
              <p className="ngo-description">Promoting quality education in underserved communities</p>
              <div className="ngo-tags">
                <span className="tag tag-blue">SDG 4</span>
              </div>
              <button className="view-projects-button">View Projects</button>
            </div>
            
            <div className="ngo-card">
              <img src="src/assets/images/Green Earth.jpg" alt="NGO Logo" className="ngo-logo"/>
              <h3 className="ngo-title">Green Earth</h3>
              <p className="ngo-description">Working towards environmental sustainability</p>
              <div className="ngo-tags">
                <span className="tag tag-green">SDG 13</span>
              </div>
              <button className="view-projects-button">View Projects</button>
            </div>
            
            <div className="ngo-card">
              <img src="src/assets/images/skill builders.png" alt="NGO Logo" className="ngo-logo"/>
              <h3 className="ngo-title">Skill Builders</h3>
              <p className="ngo-description">Empowering youth through skills development</p>
              <div className="ngo-tags">
                <span className="tag tag-yellow">SDG 8</span>
              </div>
              <button className="view-projects-button">View Projects</button>
            </div>
            
            <div className="ngo-card">
              <img src="src/assets/images/health matters.png" alt="NGO Logo" className="ngo-logo"/>
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
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="src/assets/images/priya sharma.png" alt="User Avatar" className="testimonial-avatar" />
                <div>
                  <h3 className="testimonial-name">Priya Sharma</h3>
                  <p className="testimonial-role">Volunteer, Digital Skills Mentor</p>
                </div>
              </div>
              <p className="testimonial-text">"Connect4Change made it easy for me to find an education project that matched my tech skills. I've been teaching digital literacy to rural students for 6 months now, and the platform's project management tools have been invaluable for coordinating with the NGO team."</p>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="src/assets/images/rameshh patel.jpg" alt="User Avatar" className="testimonial-avatar"/>
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
    </>
  );
};