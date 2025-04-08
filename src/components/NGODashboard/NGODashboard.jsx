import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NGODashboard.css";



 function NGODashboard() {

  
  // State for active tab in each section
  const [activeProjectsTab, setActiveProjectsTab] = useState("all");
  const [activeVolunteersTab, setActiveVolunteersTab] = useState("active");
  
  // Filter projects based on active tab
  const filteredProjects = () => {
    if (activeProjectsTab === "all") return projects;
    return projects.filter(project => project.status.toLowerCase() === activeProjectsTab);
  };

  const filteredVolunteers = () => {
    if (activeVolunteersTab === "active") return volunteers;
    return pendingVolunteers;
  };

  return (
    <div className="ngo-dashboard">
      /* Dashboard Header */
      <header className="dashboard-header">
        <div className="container">
          <div className="ngo-profile">
            <img src={ngoInfo.logo} alt={ngoInfo.name} className="ngo-logo" />
            <div className="ngo-info">
              <div className="ngo-name-container">
                <h1 className="ngo-name">{ngoInfo.name}</h1>
                {ngoInfo.verified && (
                  <span className="verified-badge" title="Verified Organization">
                    <i className="fas fa-check-circle"></i>
                  </span>
                )}
              </div>
              <p className="ngo-description">{ngoInfo.description}</p>
              <div className="ngo-tags">
                {ngoInfo.sdgs.map((sdg, index) => (
                  <span key={index} className={`tag tag-${sdg === "SDG 4" ? "blue" : "green"}`}>
                    {sdg}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/create-project">
              <button className="primary-button">
                <i className="fas fa-plus"></i> Create New Project
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
                <h3 className="sidebar-title">NGO Details</h3>
                <ul className="sidebar-list">
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-user"></i> Contact:
                    </span>
                    <span className="item-value">{ngoInfo.contactPerson}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-envelope"></i> Email:
                    </span>
                    <span className="item-value">{ngoInfo.email}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-phone"></i> Phone:
                    </span>
                    <span className="item-value">{ngoInfo.phone}</span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-map-marker-alt"></i> Location:
                    </span>
                    <span className="item-value">{ngoInfo.location}</span>
                  </li>
                </ul>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Quick Stats</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">{projects.length}</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{volunteers.length}</span>
                    <span className="stat-label">Volunteers</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{pendingVolunteers.length}</span>
                    <span className="stat-label">Pending</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">
                      {projects.filter(p => p.status === "Completed").length}
                    </span>
                    <span className="stat-label">Completed</span>
                  </div>
                </div>
              </div>
              
              <div className="sidebar-section">
                <h3 className="sidebar-title">Quick Actions</h3>
                <div className="quick-actions">
                  <button className="action-button">
                    <i className="fas fa-envelope"></i> Messages
                    <span className="notification-badge">3</span>
                  </button>
                  <button className="action-button">
                    <i className="fas fa-file-alt"></i> Reports
                  </button>
                  <button className="action-button">
                    <i className="fas fa-users"></i> Team
                  </button>
                  <button className="action-button">
                    <i className="fas fa-cog"></i> Settings
                  </button>
                </div>
              </div>
            </aside>
            
            {/* Main Dashboard Content */}
            <div className="dashboard-main">
              {/* Projects Section */}
              <section className="dashboard-section">
                <div className="section-header-with-tabs">
                  <h2 className="section-title">Projects</h2>
                  <div className="tabs">
                    <button 
                      className={`tab ${activeProjectsTab === "all" ? "active" : ""}`}
                      onClick={() => setActiveProjectsTab("all")}
                    >
                      All
                    </button>
                    <button 
                      className={`tab ${activeProjectsTab === "in progress" ? "active" : ""}`}
                      onClick={() => setActiveProjectsTab("in progress")}
                    >
                      In Progress
                    </button>
                    <button 
                      className={`tab ${activeProjectsTab === "planning" ? "active" : ""}`}
                      onClick={() => setActiveProjectsTab("planning")}
                    >
                      Planning
                    </button>
                    <button 
                      className={`tab ${activeProjectsTab === "completed" ? "active" : ""}`}
                      onClick={() => setActiveProjectsTab("completed")}
                    >
                      Completed
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
                      
                      <div className="project-description">
                        <p>{project.description}</p>
                      </div>
                      
                      <div className="project-details">
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
                            className={`tag tag-${sdg === "SDG 4" ? "blue" : sdg === "SDG 9" ? "purple" : "green"}`}
                          >
                            {sdg}
                          </span>
                        ))}
                      </div>
                      
                      <div className="project-progress">
                        <div className="progress-header">
                          <span className="progress-label">Overall Progress</span>
                          <span className="progress-value">{project.progress}%</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="project-volunteers-summary">
                        <div className="volunteers-stats">
                          <div className="volunteer-stat">
                            <span className="stat-label">Required:</span>
                            <span className="stat-value">{project.volunteers.required}</span>
                          </div>
                          <div className="volunteer-stat">
                            <span className="stat-label">Enrolled:</span>
                            <span className="stat-value">{project.volunteers.enrolled}</span>
                          </div>
                          <div className="volunteer-stat">
                            <span className="stat-label">Pending:</span>
                            <span className="stat-value">{project.volunteers.pending}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="project-actions">
                        <button className="project-action-btn">
                          <i className="fas fa-tasks"></i> Manage Tasks
                        </button>
                        <button className="project-action-btn">
                          <i className="fas fa-users"></i> View Team
                        </button>
                        <button className="project-action-btn">
                          <i className="fas fa-chart-line"></i> Report
                        </button>
                        <button className="project-action-btn">
                          <i className="fas fa-ellipsis-h"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Volunteers Section */}
              <section className="dashboard-section">
                <div className="section-header-with-tabs">
                  <h2 className="section-title">Volunteers</h2>
                  <div className="tabs">
                    <button 
                      className={`tab ${activeVolunteersTab === "active" ? "active" : ""}`}
                      onClick={() => setActiveVolunteersTab("active")}
                    >
                      Active ({volunteers.length})
                    </button>
                    <button 
                      className={`tab ${activeVolunteersTab === "pending" ? "active" : ""}`}
                      onClick={() => setActiveVolunteersTab("pending")}
                    >
                      Pending Applications ({pendingVolunteers.length})
                    </button>
                  </div>
                </div>
                
                {activeVolunteersTab === "active" ? (
                  <div className="volunteers-table-container">
                    <table className="volunteers-table">
                      <thead>
                        <tr>
                          <th>Volunteer</th>
                          <th>Skills</th>
                          <th>Project</th>
                          <th>Joined</th>
                          <th>Hours</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredVolunteers().map(volunteer => (
                          <tr key={volunteer.id}>
                            <td className="volunteer-info">
                              <img 
                                src={volunteer.avatar} 
                                alt={volunteer.name}
                                className="volunteer-avatar" 
                              />
                              <span className="volunteer-name">{volunteer.name}</span>
                            </td>
                            <td className="volunteer-skills">
                              {volunteer.skills.map((skill, index) => (
                                <span key={index} className="skill-tag">
                                  {skill}
                                </span>
                              ))}
                            </td>
                            <td>{volunteer.project}</td>
                            <td>{new Date(volunteer.joinedDate).toLocaleDateString()}</td>
                            <td className="volunteer-hours">{volunteer.hoursContributed} hrs</td>
                            <td>
                              <span className="volunteer-status status-active">
                                {volunteer.status}
                              </span>
                            </td>
                            <td className="action-cell">
                              <button className="action-btn" title="Message">
                                <i className="fas fa-envelope"></i>
                              </button>
                              <button className="action-btn" title="View Profile">
                                <i className="fas fa-user"></i>
                              </button>
                              <button className="action-btn" title="More">
                                <i className="fas fa-ellipsis-v"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="applications-list">
                    {filteredVolunteers().map(applicant => (
                      <div key={applicant.id} className="application-card">
                        <div className="application-header">
                          <div className="applicant-info">
                            <img 
                              src={applicant.avatar} 
                              alt={applicant.name}
                              className="applicant-avatar" 
                            />
                            <div>
                              <h3 className="applicant-name">{applicant.name}</h3>
                              <p className="application-date">
                                Applied on {new Date(applicant.appliedDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="application-project">
                            <span className="application-label">Applied for:</span>
                            <span className="project-name">{applicant.appliedFor}</span>
                          </div>
                        </div>
                        
                        <div className="applicant-skills">
                          <span className="skills-label">Skills:</span>
                          <div className="skills-tags">
                            {applicant.skills.map((skill, index) => (
                              <span key={index} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="application-message">
                          <p>"{applicant.message}"</p>
                        </div>
                        
                        <div className="application-actions">
                          <button className="approve-btn">
                            <i className="fas fa-check"></i> Approve
                          </button>
                          <button className="message-btn">
                            <i className="fas fa-envelope"></i> Message
                          </button>
                          <button className="profile-btn">
                            <i className="fas fa-user"></i> View Profile
                          </button>
                          <button className="reject-btn">
                            <i className="fas fa-times"></i> Decline
                          </button>
                        </div>
                      </div>
                    ))}
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

export default NGODashboard;