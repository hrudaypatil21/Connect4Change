import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./VolunteerDashboard.css";

function VolunteerDashboard() {
  // Sample data - In a real application, this would come from an API
  //this is a change for commit 
  const volunteerInfo = {
    name: "Priya Sharma",
    avatar: "/api/placeholder/150/150",
    description: "Digital literacy educator and coding instructor",
    skills: ["Digital Literacy", "Programming", "Teaching"],
    email: "priya.sharma@gmail.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    verified: true,
    joinedDate: "2024-09-10",
    totalHours: 158,
    projectsCompleted: 5,
    badges: ["Top Contributor", "Digital Champion", "1 Year Service"]
  };
  
  const activeProjects = [
    {
      id: 1,
      title: "Digital Literacy for Rural Schools",
      ngo: "Education First",
      ngoLogo: "/api/placeholder/64/64",
      status: "In Progress",
      startDate: "2025-01-15",
      endDate: "2025-06-30",
      location: "Rajasthan",
      sdgs: ["SDG 4", "SDG 17"],
      description: "Providing computer training and digital skills to children in underserved rural communities.",
      role: "Digital Literacy Instructor",
      hoursContributed: 45,
      hoursRequired: 120,
      progress: 65,
      nextTask: "Prepare curriculum for basic internet safety module",
      nextTaskDeadline: "2025-04-10"
    }
  ];
  
  const pastProjects = [
    {
      id: 2,
      title: "Girls Coding Camp",
      ngo: "TechForAll",
      ngoLogo: "/api/placeholder/64/64",
      status: "Completed",
      startDate: "2024-07-10",
      endDate: "2024-10-15",
      location: "Delhi",
      sdgs: ["SDG 4", "SDG 5"],
      description: "Teaching coding skills to high school girls to increase female representation in tech.",
      role: "Programming Instructor",
      hoursContributed: 60,
      impact: "Trained 25 girls; 15 participants created their first web application",
      feedback: "Outstanding contribution and dedication to the participants' learning journey."
    },
    {
      id: 3,
      title: "Teacher Technology Training",
      ngo: "Education First",
      ngoLogo: "/api/placeholder/64/64",
      status: "Completed",
      startDate: "2024-05-15",
      endDate: "2024-07-30",
      location: "Uttarakhand",
      sdgs: ["SDG 4"],
      description: "Training rural teachers on using technology effectively in classrooms.",
      role: "Technology Trainer",
      hoursContributed: 53,
      impact: "12 teachers trained; 8 schools implemented new digital teaching methods",
      feedback: "Excellent communication skills and adaptability to participants' needs."
    }
  ];
  
  const recommendedProjects = [
    {
      id: 4,
      title: "Coding for Kids Workshop Series",
      ngo: "ChildTech Foundation",
      ngoLogo: "/api/placeholder/64/64",
      match: 95,
      location: "Mumbai, India",
      timeCommitment: "4 hours/week for 3 months",
      startDate: "2025-05-01",
      sdgs: ["SDG 4", "SDG 10"],
      description: "Teaching basic programming concepts to children aged 10-14 using interactive tools and games.",
      skillsNeeded: ["Programming", "Teaching", "Patience"],
      matchReasons: [
        "Your teaching experience aligns perfectly with the role",
        "You have all the required technical skills",
        "Location is in your preferred area",
        "Project aligns with your interest in education"
      ]
    },
    {
      id: 5,
      title: "Digital Library Setup",
      ngo: "Rural Readers Association",
      ngoLogo: "/api/placeholder/64/64",
      match: 88,
      location: "Pune, Maharashtra",
      timeCommitment: "10 hours/week for 2 months",
      startDate: "2025-04-15",
      sdgs: ["SDG 4", "SDG 9"],
      description: "Setting up digital libraries in 5 rural schools with e-books, educational content, and basic computer systems.",
      skillsNeeded: ["Digital Literacy", "System Setup", "Content Curation"],
      matchReasons: [
        "Your digital literacy skills are an excellent match",
        "Project timing fits well with your schedule",
        "Strong alignment with your past project experiences",
        "Project needs someone with your technical expertise"
      ]
    },
    {
      id: 6,
      title: "Online Education Platform Development",
      ngo: "Education First",
      ngoLogo: "/api/placeholder/64/64",
      match: 82,
      location: "Remote",
      timeCommitment: "6 hours/week for 4 months",
      startDate: "2025-05-20",
      sdgs: ["SDG 4", "SDG 17"],
      description: "Developing an online platform to deliver educational content to students in remote areas.",
      skillsNeeded: ["Programming", "Web Development", "Educational Content"],
      matchReasons: [
        "Your programming skills match the project requirements",
        "You have experience with this NGO",
        "Remote work fits your preferences",
        "Your teaching experience adds valuable perspective"
      ]
    }
  ];
  
  const notifications = [
    {
      id: 1,
      type: "message",
      from: "Ramesh Patel",
      fromRole: "Project Coordinator",
      fromAvatar: "/api/placeholder/40/40",
      content: "Meeting scheduled for Digital Literacy project this Thursday at 5 PM",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "task",
      project: "Digital Literacy for Rural Schools",
      content: "New task assigned: Prepare curriculum for basic internet safety module",
      deadline: "Due by April 10, 2025",
      time: "Yesterday",
      unread: true
    },
    {
      id: 3,
      type: "milestone",
      project: "Digital Literacy for Rural Schools",
      content: "Milestone achieved: 50% of curriculum development completed",
      time: "3 days ago",
      unread: false
    },
    {
      id: 4,
      type: "feedback",
      from: "Education First",
      content: "Received positive feedback on your recent training session",
      time: "1 week ago",
      unread: false
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: "Digital Literacy Workshop",
      date: "2025-04-08",
      time: "10:00 AM - 1:00 PM",
      location: "Government School, Jaipur",
      project: "Digital Literacy for Rural Schools"
    },
    {
      id: 2,
      title: "Project Team Meeting",
      date: "2025-04-11",
      time: "5:00 PM - 6:00 PM",
      location: "Online (Zoom)",
      project: "Digital Literacy for Rural Schools"
    },
    {
      id: 3,
      title: "NGO Volunteer Monthly Meetup",
      date: "2025-04-15",
      time: "6:30 PM - 8:00 PM",
      location: "Education First Office, Mumbai",
      project: "General"
    }
  ];
  
  // State for active tab in each section
  const [activeProjectsTab, setActiveProjectsTab] = useState("active");
  const [activeRecommendationsTab, setActiveRecommendationsTab] = useState("matches");
  const [showMatchDetails, setShowMatchDetails] = useState(null);
  
  // Filter projects based on active tab
  const filteredProjects = () => {
    if (activeProjectsTab === "active") return activeProjects;
    return pastProjects;
  };

  return (
    <div className="volunteer-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="volunteer-profile">
            <img src={volunteerInfo.avatar} alt={volunteerInfo.name} className="volunteer-avatar" />
            <div className="volunteer-info">
              <div className="volunteer-name-container">
                <h1 className="volunteer-name">{volunteerInfo.name}</h1>
                {volunteerInfo.verified && (
                  <span className="verified-badge" title="Verified Volunteer">
                    <i className="fas fa-check-circle"></i>
                  </span>
                )}
              </div>
              <p className="volunteer-description">{volunteerInfo.description}</p>
              <div className="volunteer-tags">
                {volunteerInfo.skills.map((skill, index) => (
                  <span key={index} className="tag tag-blue">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/browse-projects">
              <button className="primary-button">
                <i className="fas fa-search"></i> Browse Projects
              </button>
            </Link>
            <button className="secondary-button">
              <i className="fas fa-edit"></i> Edit Profile
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
                    <span className="item-value">{volunteerInfo.phone}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-map-marker-alt"></i> Location:
                    </span>
                    <span className="item-value">{volunteerInfo.location}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-calendar"></i> Joined:
                    </span>
                    <span className="item-value">{new Date(volunteerInfo.joinedDate).toLocaleDateString()}</span>
                  </li>
                </ul>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Impact Summary</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">{volunteerInfo.totalHours}</span>
                    <span className="stat-label">Hours</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{activeProjects.length + pastProjects.length}</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{volunteerInfo.projectsCompleted}</span>
                    <span className="stat-label">Completed</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{volunteerInfo.badges.length}</span>
                    <span className="stat-label">Badges</span>
                  </div>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Badges & Recognition</h3>
                <div className="badges-list">
                  {volunteerInfo.badges.map((badge, index) => (
                    <div key={index} className="badge-item">
                      <div className="badge-icon">
                        <i className={`fas fa-${index === 0 ? 'award' : index === 1 ? 'laptop-code' : 'calendar-check'}`}></i>
                      </div>
                      <span className="badge-name">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Upcoming Events</h3>
                <div className="events-list">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <div className="date-display">
                          <span className="date-month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                          <span className="date-day">{new Date(event.date).getDate()}</span>
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
            </aside>
            
            {/* Main Dashboard Content */}
            <div className="dashboard-main">
              {/* Notifications Section */}
              <section className="dashboard-section">
                <div className="section-header">
                  <h2 className="section-title">Notifications</h2>
                  <span className="notification-count">{notifications.filter(n => n.unread).length} new</span>
                </div>
                
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                      {notification.type === 'message' && (
                        <div className="notification-icon message-icon">
                          <i className="fas fa-comment-alt"></i>
                        </div>
                      )}
                      {notification.type === 'task' && (
                        <div className="notification-icon task-icon">
                          <i className="fas fa-tasks"></i>
                        </div>
                      )}
                      {notification.type === 'milestone' && (
                        <div className="notification-icon milestone-icon">
                          <i className="fas fa-flag"></i>
                        </div>
                      )}
                      {notification.type === 'feedback' && (
                        <div className="notification-icon feedback-icon">
                          <i className="fas fa-star"></i>
                        </div>
                      )}
                      
                      <div className="notification-content">
                        {notification.type === 'message' && (
                          <div className="notification-header">
                            <img src={notification.fromAvatar} alt={notification.from} className="notification-avatar" />
                            <div>
                              <span className="notification-from">{notification.from}</span>
                              <span className="notification-role">{notification.fromRole}</span>
                            </div>
                          </div>
                        )}
                        
                        {(notification.type === 'task' || notification.type === 'milestone') && (
                          <div className="notification-project">
                            <i className="fas fa-project-diagram"></i> {notification.project}
                          </div>
                        )}
                        
                        {notification.type === 'feedback' && (
                          <div className="notification-project">
                            <i className="fas fa-building"></i> {notification.from}
                          </div>
                        )}
                        
                        <p className="notification-text">{notification.content}</p>
                        
                        {notification.type === 'task' && (
                          <div className="notification-deadline">
                            <i className="fas fa-calendar-alt"></i> {notification.deadline}
                          </div>
                        )}
                        
                        <div className="notification-footer">
                          <span className="notification-time">{notification.time}</span>
                          <div className="notification-actions">
                            {notification.type === 'message' && (
                              <button className="action-btn" title="Reply">
                                <i className="fas fa-reply"></i>
                              </button>
                            )}
                            {notification.type === 'task' && (
                              <button className="action-btn" title="View Task">
                                <i className="fas fa-eye"></i>
                              </button>
                            )}
                            <button className="action-btn" title="Mark as Read">
                              <i className="fas fa-check"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
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
                        <img src={project.ngoLogo} alt={project.ngo} className="ngo-logo-small" />
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
                            {new Date(project.startDate).toLocaleDateString()} - 
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
                      
                      <div className="project-sdgs">
                        {project.sdgs.map((sdg, index) => (
                          <span 
                            key={index} 
                            className={`tag tag-${sdg === "SDG 4" ? "blue" : sdg === "SDG 5" ? "purple" : "green"}`}
                          >
                            {sdg}
                          </span>
                        ))}
                      </div>
                      
                      {activeProjectsTab === "active" && (
                        <>
                          <div className="project-progress">
                            <div className="progress-header">
                              <span className="progress-label">Hours Contributed</span>
                              <span className="progress-value">{project.hoursContributed}/{project.hoursRequired} hrs</span>
                            </div>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${(project.hoursContributed / project.hoursRequired) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="project-next-task">
                            <div className="next-task-header">
                              <i className="fas fa-tasks"></i>
                              <span>Next Task</span>
                            </div>
                            <div className="next-task-content">
                              <p>{project.nextTask}</p>
                              <div className="task-deadline">
                                <i className="fas fa-calendar-day"></i>
                                <span>Due by {new Date(project.nextTaskDeadline).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {activeProjectsTab === "past" && (
                        <>
                          <div className="project-impact">
                            <div className="impact-header">
                              <i className="fas fa-chart-line"></i>
                              <span>Impact</span>
                            </div>
                            <p>{project.impact}</p>
                          </div>
                          
                          <div className="project-feedback">
                            <div className="feedback-header">
                              <i className="fas fa-comment"></i>
                              <span>Feedback</span>
                            </div>
                            <p>"{project.feedback}"</p>
                          </div>
                          
                          <div className="project-hours">
                            <i className="fas fa-clock"></i>
                            <span>Hours Contributed: <strong>{project.hoursContributed}</strong></span>
                          </div>
                        </>
                      )}
                      
                      <div className="project-actions">
                        {activeProjectsTab === "active" && (
                          <>
                            <button className="project-action-btn">
                              <i className="fas fa-tasks"></i> View Tasks
                            </button>
                            <button className="project-action-btn">
                              <i className="fas fa-calendar-alt"></i> Schedule
                            </button>
                            <button className="project-action-btn">
                              <i className="fas fa-users"></i> Team
                            </button>
                            <button className="project-action-btn">
                              <i className="fas fa-file-alt"></i> Log Hours
                            </button>
                          </>
                        )}
                        
                        {activeProjectsTab === "past" && (
                          <>
                            <button className="project-action-btn">
                              <i className="fas fa-certificate"></i> View Certificate
                            </button>
                            <button className="project-action-btn">
                              <i className="fas fa-share-alt"></i> Share Impact
                            </button>
                          </>
                        )}
                        
                        <button className="project-action-btn">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* AI Recommended Projects Section */}
              <section className="dashboard-section">
                <div className="section-header-with-tabs">
                  <h2 className="section-title">
                    <i className="fas fa-robot"></i> AI Recommended Projects
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
                            <img src={project.ngoLogo} alt={project.ngo} className="ngo-logo-small" />
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
                            <span className="detail-value">{new Date(project.startDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="project-sdgs">
                          {project.sdgs.map((sdg, index) => (
                            <span 
                              key={index} 
                              className={`tag tag-${sdg === "SDG 4" ? "blue" : sdg === "SDG 10" ? "purple" : "green"}`}
                            >
                              {sdg}
                            </span>
                          ))}
                        </div>
                        
                        <p className="recommended-project-description">{project.description}</p>
                        
                        <div className="skills-needed">
                          <span className="skills-label">Skills Needed:</span>
                          <div className="skills-tags">
                            {project.skillsNeeded.map((skill, index) => (
                              <span 
                                key={index} 
                                className={`skill-tag ${volunteerInfo.skills.includes(skill) ? 'skill-match' : ''}`}
                              >
                                {skill} {volunteerInfo.skills.includes(skill) && <i className="fas fa-check"></i>}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {showMatchDetails === project.id && (
                          <div className="match-details">
                            <h4>Why This Matches You:</h4>
                            <ul className="match-reasons-list">
                              {project.matchReasons.map((reason, index) => (
                                <li key={index} className="match-reason-item">
                                  <i className="fas fa-check-circle"></i>
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="recommended-project-actions">
                          <button className="apply-btn">
                            <i className="fas fa-paper-plane"></i> Apply Now
                          </button>
                          <button className="save-btn">
                            <i className="fas fa-bookmark"></i> Save
                          </button>
                          <button 
                            className="match-details-btn"
                            onClick={() => setShowMatchDetails(showMatchDetails === project.id ? null : project.id)}
                          >
                            {showMatchDetails === project.id ? (
                              <><i className="fas fa-chevron-up"></i> Hide Match Details</>
                            ) : (
                              <><i className="fas fa-chevron-down"></i> Show Match Details</>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VolunteerDashboard;