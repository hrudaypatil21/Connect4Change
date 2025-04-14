import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./VolunteerDashboard.css";
import { API_BASE_URL } from '../../config/api';

function VolunteerDashboard() {
  const navigate = useNavigate();
  const [volunteerInfo, setVolunteerInfo] = useState(null);
  const [activeProjects, setActiveProjects] = useState([]);
  const [pastProjects, setPastProjects] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeProjectsTab, setActiveProjectsTab] = useState("active");
  const [activeRecommendationsTab, setActiveRecommendationsTab] = useState("matches");
  const [showMatchDetails, setShowMatchDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
          navigate('/login');
          return;
        }

        // Set basic volunteer info from stored data
        setVolunteerInfo({
          id: user.id,
          name: user.name,
          email: user.email,
          location: user.location,
          phone: user.phone,
          address: user.address,
          bio: user.bio,
          skills: user.skills || [],
          interests: user.interests || [],
          availability: user.availability || '',
          createdAt: user.createdAt || new Date().toISOString()
        });

        // Fetch additional data (mock data for demonstration)
        setActiveProjects([
          {
            id: 1,
            title: "Community Teaching Program",
            ngo: "Education For All",
            description: "Teaching basic math and science to underprivileged children",
            status: "Active",
            role: "Math Tutor",
            startDate: "2023-05-01",
            endDate: "2023-12-31",
            location: "Local Community Center",
            hoursContributed: 45,
            hoursRequired: 100,
            nextTask: "Prepare lesson plan for next week",
            nextTaskDeadline: "2023-11-15",
            sdgs: ["Quality Education", "Reduced Inequalities"]
          }
        ]);

        setPastProjects([
          {
            id: 2,
            title: "Summer Reading Program",
            ngo: "Literacy Foundation",
            description: "Helping children improve their reading skills",
            status: "Completed",
            role: "Reading Mentor",
            startDate: "2023-01-15",
            endDate: "2023-04-30",
            location: "City Library",
            hoursContributed: 80,
            impact: "Helped 25 children improve their reading level by at least one grade",
            feedback: "John was an excellent mentor who showed great patience and creativity in engaging the children.",
            sdgs: ["Quality Education"]
          }
        ]);

        setRecommendedProjects([
          {
            id: 3,
            title: "Environmental Awareness Campaign",
            ngo: "Green Earth Initiative",
            description: "Educating communities about sustainable practices",
            match: 85,
            location: "Various locations",
            timeCommitment: "5-10 hours/week",
            startDate: "2023-11-20",
            skillsNeeded: ["Public Speaking", "Environmental Science"],
            matchReasons: [
              "Matches your interest in environmental causes",
              "Utilizes your public speaking skills",
              "Fits your availability"
            ],
            sdgs: ["Climate Action", "Life on Land"]
          }
        ]);

        setNotifications([
          {
            id: 1,
            type: "message",
            from: "Education For All",
            fromRole: "Project Coordinator",
            content: "Your teaching schedule has been updated for next week",
            time: "2 hours ago",
            unread: true
          }
        ]);

        setUpcomingEvents([
          {
            id: 1,
            title: "Volunteer Training Session",
            date: "2023-11-20",
            time: "10:00 AM - 12:00 PM",
            location: "Community Center Room 3",
            project: "Community Teaching Program"
          }
        ]);

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const filteredProjects = () => {
    return activeProjectsTab === "active" ? activeProjects : pastProjects;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.type !== 'individual') return;
        
        const response = await axios.get(
          `${API_BASE_URL}/api/applications/volunteer/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setApplications(response.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchApplications();
  }, []);

  const handleApplicationStatusChange = async (projectId, status) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.put(`${API_BASE_URL}/api/projects/${projectId}/status`, { 
        volunteerId: user.id, 
        status 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setActiveProjects(activeProjects.map(project => 
        project.id === projectId ? { ...project, status } : project
      ));
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!volunteerInfo) {
    return <div>Error loading dashboard. Please try again.</div>;
  }

  return (
    <div className="volunteer-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="volunteer-profile">
            <div className="volunteer-avatar">
              {volunteerInfo.name.charAt(0).toUpperCase()}
            </div>
            <div className="volunteer-info">
              <div className="volunteer-name-container">
                <h1 className="volunteer-name">{volunteerInfo.name}</h1>
                <span className="verified-badge" title="Verified Volunteer">
                  <i className="fas fa-check-circle"></i>
                </span>
              </div>
              <p className="volunteer-description">{volunteerInfo.bio || "Passionate volunteer making a difference"}</p>
              <div className="volunteer-tags">
                {volunteerInfo.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="tag tag-blue">
                    {skill}
                  </span>
                ))}
                {volunteerInfo.skills.length > 3 && (
                  <span className="tag tag-blue">+{volunteerInfo.skills.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/browse-projects">
              <button className="primary-button">
                <i className="fas fa-search"></i> Browse Projects
              </button>
            </Link>
            <button className="secondary-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            {/* Dashboard Sidebar */}
            <aside className="dashboard-sidebar">
              <div className="sidebar-section">
                <h3 className="sidebar-title">My Details</h3>
                <ul className="sidebar-list">
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-envelope"></i> Email:
                    </span>
                    <span className="item-value">{volunteerInfo.email}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-phone"></i> Phone:
                    </span>
                    <span className="item-value">{volunteerInfo.phone || "Not provided"}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-map-marker-alt"></i> Location:
                    </span>
                    <span className="item-value">{volunteerInfo.location || "Not specified"}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-home"></i> Address:
                    </span>
                    <span className="item-value">{volunteerInfo.address || "Not specified"}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-calendar-check"></i> Availability:
                    </span>
                    <span className="item-value">{volunteerInfo.availability || "Flexible"}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-calendar"></i> Member Since:
                    </span>
                    <span className="item-value">
                      {new Date(volunteerInfo.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Interests & Skills</h3>
                <div className="skills-interests-container">
                  <div className="skills-section">
                    <h4>Skills</h4>
                    <div className="tags-container">
                      {volunteerInfo.skills.map((skill, index) => (
                        <span key={`skill-${index}`} className="tag tag-blue">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="interests-section">
                    <h4>Interests</h4>
                    <div className="tags-container">
                      {volunteerInfo.interests.map((interest, index) => (
                        <span key={`interest-${index}`} className="tag tag-purple">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Impact Summary</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">
                      {activeProjects.reduce((sum, project) => sum + project.hoursContributed, 0) +
                       pastProjects.reduce((sum, project) => sum + project.hoursContributed, 0)}
                    </span>
                    <span className="stat-label">Hours</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">
                      {activeProjects.length + pastProjects.length}
                    </span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">
                      {pastProjects.length}
                    </span>
                    <span className="stat-label">Completed</span>
                  </div>
                </div>
              </div>
              
              {upcomingEvents.length > 0 && (
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Upcoming Events</h3>
                  <div className="events-list">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="event-item">
                        <div className="event-date">
                          <div className="date-display">
                            <span className="date-month">
                              {new Date(event.date).toLocaleString('default', { month: 'short' })}
                            </span>
                            <span className="date-day">
                              {new Date(event.date).getDate()}
                            </span>
                          </div>
                        </div>
                        <div className="event-details">
                          <h4 className="event-title">{event.title}</h4>
                          <p className="event-time">
                            <i className="fas fa-clock"></i> {event.time}
                          </p>
                          <p className="event-location">
                            <i className="fas fa-map-marker-alt"></i> {event.location}
                          </p>
                          <span className="event-project">{event.project}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
            
            {/* Main Dashboard Content */}
            <div className="dashboard-main">
              {/* Projects Section */}
              <section className="dashboard-section">
                <div className="section-header-with-tabs">
                  <h2 className="section-title">My Projects</h2>
                  <div className="tabs">
                    <button 
                      className={`tab ${activeProjectsTab === "active" ? "active" : ""}`}
                      onClick={() => setActiveProjectsTab("active")}
                    >
                      Active ({activeProjects.length})
                    </button>
                    <button 
                      className={`tab ${activeProjectsTab === "past" ? "active" : ""}`}
                      onClick={() => setActiveProjectsTab("past")}
                    >
                      Past ({pastProjects.length})
                    </button>
                  </div>
                </div>
                
                {filteredProjects().length > 0 ? (
                  <div className="projects-list">
                    {filteredProjects().map(project => (
                      <div key={project.id} className="project-item">
                        <div className="project-header">
                          <h3 className="project-title">{project.title}</h3>
                          <span className={`project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="project-ngo">
                          <div className="ngo-logo-small">
                            {project.ngo.charAt(0).toUpperCase()}
                          </div>
                          <span className="ngo-name">{project.ngo}</span>
                        </div>
                        
                        <div className="project-description">
                          <p>{project.description}</p>
                        </div>
                        
                        <div className="project-details">
                          <div className="detail-item">
                            <span className="detail-label">
                              <i className="fas fa-user-tag"></i> Role:
                            </span>
                            <span className="detail-value">{project.role}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">
                              <i className="fas fa-calendar"></i> Timeline:
                            </span>
                            <span className="detail-value">
                              {new Date(project.startDate).toLocaleDateString()} - {' '}
                              {new Date(project.endDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">
                              <i className="fas fa-map-marker-alt"></i> Location:
                            </span>
                            <span className="detail-value">{project.location}</span>
                          </div>
                        </div>
                        
                        {project.sdgs?.length > 0 && (
                          <div className="project-sdgs">
                            {project.sdgs.map((sdg, index) => (
                              <span 
                                key={index} 
                                className={`tag tag-${index % 3 === 0 ? "blue" : index % 3 === 1 ? "purple" : "green"}`}
                              >
                                {sdg}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {activeProjectsTab === "active" && (
                          <>
                            <div className="project-progress">
                              <div className="progress-header">
                                <span className="progress-label">Hours Contributed</span>
                                <span className="progress-value">
                                  {project.hoursContributed}/{project.hoursRequired} hrs
                                </span>
                              </div>
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill" 
                                  style={{ 
                                    width: `${Math.min(
                                      (project.hoursContributed / project.hoursRequired) * 100, 
                                      100
                                    )}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                            
                            {project.nextTask && (
                              <div className="project-next-task">
                                <div className="next-task-header">
                                  <i className="fas fa-tasks"></i>
                                  <span>Next Task</span>
                                </div>
                                <div className="next-task-content">
                                  <p>{project.nextTask}</p>
                                  {project.nextTaskDeadline && (
                                    <div className="task-deadline">
                                      <i className="fas fa-calendar-day"></i>
                                      <span>
                                        Due by {new Date(project.nextTaskDeadline).toLocaleDateString()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                        
                        {activeProjectsTab === "past" && (
                          <>
                            {project.impact && (
                              <div className="project-impact">
                                <div className="impact-header">
                                  <i className="fas fa-chart-line"></i>
                                  <span>Impact</span>
                                </div>
                                <p>{project.impact}</p>
                              </div>
                            )}
                            
                            {project.feedback && (
                              <div className="project-feedback">
                                <div className="feedback-header">
                                  <i className="fas fa-comment"></i>
                                  <span>Feedback</span>
                                </div>
                                <p>"{project.feedback}"</p>
                              </div>
                            )}
                            
                            <div className="project-hours">
                              <i className="fas fa-clock"></i>
                              <span>
                                Hours Contributed: <strong>{project.hoursContributed}</strong>
                              </span>
                            </div>
                          </>
                        )}
                        
                        <div className="project-actions">
                          {activeProjectsTab === "active" ? (
                            <>
                              <button className="project-action-btn">
                                <i className="fas fa-tasks"></i> View Tasks
                              </button>
                              <button className="project-action-btn">
                                <i className="fas fa-calendar-alt"></i> Schedule
                              </button>
                              <button className="project-action-btn">
                                <i className="fas fa-file-alt"></i> Log Hours
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="project-action-btn">
                                <i className="fas fa-certificate"></i> View Certificate
                              </button>
                              <button className="project-action-btn">
                                <i className="fas fa-share-alt"></i> Share Impact
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-project-diagram"></i>
                    <p>No {activeProjectsTab === "active" ? "active" : "past"} projects found</p>
                    {activeProjectsTab === "active" && (
                      <Link to="/browse-projects">
                        <button className="primary-button">
                          Browse Available Projects
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </section>
              
              {/* Recommended Projects Section */}
              <section className="dashboard-section">
                <div className="section-header-with-tabs">
                  <h2 className="section-title">
                    <i className="fas fa-robot"></i> Recommended Projects
                  </h2>
                  <div className="tabs">
                    <button 
                      className={`tab ${activeRecommendationsTab === "matches" ? "active" : ""}`}
                      onClick={() => setActiveRecommendationsTab("matches")}
                    >
                      Best Matches
                    </button>
                    <button 
                      className={`tab ${activeRecommendationsTab === "recent" ? "active" : ""}`}
                      onClick={() => setActiveRecommendationsTab("recent")}
                    >
                      Recent Opportunities
                    </button>
                  </div>
                </div>
                
                {recommendedProjects.length > 0 ? (
                  <div className="recommended-projects-list">
                    {recommendedProjects.map(project => (
                      <div key={project.id} className="recommended-project-item">
                        <div className="match-score-container">
                          <div className="match-score" style={{ 
                            background: `conic-gradient(var(--primary-color) ${project.match}%, #f3f4f6 0)` 
                          }}>
                            <div className="match-score-inner">
                              <span className="match-score-percentage">{project.match}%</span>
                              <span className="match-label">Match</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="recommended-project-content">
                          <div className="recommended-project-header">
                            <h3 className="recommended-project-title">{project.title}</h3>
                            
                            <div className="project-ngo">
                              <div className="ngo-logo-small">
                                {project.ngo.charAt(0).toUpperCase()}
                              </div>
                              <span className="ngo-name">{project.ngo}</span>
                            </div>
                          </div>
                          
                          <div className="recommended-project-details">
                            <div className="detail-item">
                              <span className="detail-label">
                                <i className="fas fa-map-marker-alt"></i> Location:
                              </span>
                              <span className="detail-value">{project.location}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">
                                <i className="fas fa-clock"></i> Time:
                              </span>
                              <span className="detail-value">{project.timeCommitment}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">
                                <i className="fas fa-calendar"></i> Starts:
                              </span>
                              <span className="detail-value">
                                {new Date(project.startDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          {project.sdgs?.length > 0 && (
                            <div className="project-sdgs">
                              {project.sdgs.map((sdg, index) => (
                                <span 
                                  key={index} 
                                  className={`tag tag-${index % 3 === 0 ? "blue" : index % 3 === 1 ? "purple" : "green"}`}
                                >
                                  {sdg}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <p className="recommended-project-description">{project.description}</p>
                          
                          {project.skillsNeeded?.length > 0 && (
                            <div className="skills-needed">
                              <span className="skills-label">Skills Needed:</span>
                              <div className="skills-tags">
                                {project.skillsNeeded.map((skill, index) => (
                                  <span 
                                    key={index} 
                                    className={`skill-tag ${
                                      volunteerInfo.skills.includes(skill) ? 'skill-match' : ''
                                    }`}
                                  >
                                    {skill} {volunteerInfo.skills.includes(skill) && (
                                      <i className="fas fa-check"></i>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {showMatchDetails === project.id && (
                            <div className="match-details">
                              <h4>Why This Matches You:</h4>
                              <ul className="match-reasons-list">
                                {project.matchReasons?.map((reason, index) => (
                                  <li key={index} className="match-reason-item">
                                    <i className="fas fa-check-circle"></i>
                                    <span>{reason}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="recommended-project-actions">
                            <Link to={`/projects/${project.id}`}>
                              <button className="apply-btn">
                                <i className="fas fa-paper-plane"></i> Apply Now
                              </button>
                            </Link>
                            <button className="save-btn">
                              <i className="fas fa-bookmark"></i> Save
                            </button>
                            <button 
                              className="match-details-btn"
                              onClick={() => setShowMatchDetails(
                                showMatchDetails === project.id ? null : project.id
                              )}
                            >
                              {showMatchDetails === project.id ? (
                                <><i className="fas fa-chevron-up"></i> Hide Details</>
                              ) : (
                                <><i className="fas fa-chevron-down"></i> Show Details</>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-search"></i>
                    <p>No recommended projects found</p>
                    <Link to="/browse-projects">
                      <button className="primary-button">
                        Browse All Projects
                      </button>
                    </Link>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VolunteerDashboard;