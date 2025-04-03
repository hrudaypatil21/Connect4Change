import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NGODashboard.css";



 function NGODashboard() {
  // Sample data - In a real application, this would come from an API
  const ngoInfo = {
    name: "Education First",
    logo: "/api/placeholder/100/100",
    description: "Promoting quality education in underserved communities",
    sdgs: ["SDG 4", "SDG 17"],
    contactPerson: "Ramesh Patel",
    email: "info@educationfirst.org",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    verified: true
  };
  
  const projects = [
    {
      id: 1,
      title: "Digital Literacy for Rural Schools",
      status: "In Progress",
      startDate: "2025-01-15",
      endDate: "2025-06-30",
      location: "Rajasthan",
      sdgs: ["SDG 4", "SDG 17"],
      description: "Providing computer training and digital skills to children in underserved rural communities.",
      volunteers: {
        required: 5,
        enrolled: 3,
        pending: 2
      },
      progress: 65
    },
    {
      id: 2,
      title: "Teacher Training Program",
      status: "Planning",
      startDate: "2025-04-10",
      endDate: "2025-07-15",
      location: "Uttar Pradesh",
      sdgs: ["SDG 4"],
      description: "Training rural teachers on modern teaching methodologies and technology integration.",
      volunteers: {
        required: 8,
        enrolled: 2,
        pending: 3
      },
      progress: 25
    },
    {
      id: 3,
      title: "School Infrastructure Improvement",
      status: "Completed",
      startDate: "2024-10-05",
      endDate: "2025-02-28",
      location: "Bihar",
      sdgs: ["SDG 4", "SDG 9"],
      description: "Renovating and upgrading facilities in five rural schools to improve learning environments.",
      volunteers: {
        required: 12,
        enrolled: 12,
        pending: 0
      },
      progress: 100
    }
  ];
  
  const volunteers = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "/api/placeholder/64/64",
      skills: ["Digital Literacy", "Programming", "Teaching"],
      project: "Digital Literacy for Rural Schools",
      joinedDate: "2025-01-20",
      status: "Active",
      hoursContributed: 45
    },
    {
      id: 2,
      name: "Amit Kumar",
      avatar: "/api/placeholder/64/64",
      skills: ["Project Management", "Training", "Curriculum Development"],
      project: "Digital Literacy for Rural Schools",
      joinedDate: "2025-01-25",
      status: "Active",
      hoursContributed: 38
    },
    {
      id: 3,
      name: "Sunita Verma",
      avatar: "/api/placeholder/64/64",
      skills: ["Teaching", "Content Creation", "Art"],
      project: "Digital Literacy for Rural Schools",
      joinedDate: "2025-02-05",
      status: "Active",
      hoursContributed: 32
    },
    {
      id: 4,
      name: "Rahul Gupta",
      avatar: "/api/placeholder/64/64",
      skills: ["Training", "Educational Psychology", "Mentoring"],
      project: "Teacher Training Program",
      joinedDate: "2025-03-01",
      status: "Active",
      hoursContributed: 12
    },
    {
      id: 5,
      name: "Meera Desai",
      avatar: "/api/placeholder/64/64",
      skills: ["Teaching", "Curriculum Development", "Leadership"],
      project: "Teacher Training Program",
      joinedDate: "2025-03-10",
      status: "Active",
      hoursContributed: 15
    }
  ];
  
  const pendingVolunteers = [
    {
      id: 6,
      name: "Vikram Malhotra",
      avatar: "/api/placeholder/64/64",
      skills: ["Digital Marketing", "Social Media", "Content Creation"],
      appliedFor: "Digital Literacy for Rural Schools",
      appliedDate: "2025-03-15",
      message: "I'm passionate about education and technology. I would love to contribute to this project."
    },
    {
      id: 7,
      name: "Ananya Reddy",
      avatar: "/api/placeholder/64/64",
      skills: ["Teaching", "Counseling", "Mentoring"],
      appliedFor: "Teacher Training Program",
      appliedDate: "2025-03-18",
      message: "I have 5 years of experience as a teacher and would like to help train other teachers."
    },
    {
      id: 8,
      name: "Karthik Subramaniam",
      avatar: "/api/placeholder/64/64",
      skills: ["Programming", "Web Development", "Digital Literacy"],
      appliedFor: "Digital Literacy for Rural Schools",
      appliedDate: "2025-03-20",
      message: "I can help develop digital learning materials and teach programming basics."
    },
    {
      id: 9,
      name: "Neha Sharma",
      avatar: "/api/placeholder/64/64",
      skills: ["Educational Leadership", "Curriculum Development", "Teacher Training"],
      appliedFor: "Teacher Training Program",
      appliedDate: "2025-03-21",
      message: "I've designed and implemented teacher training programs before and would like to contribute."
    },
    {
      id: 10,
      name: "Rajiv Patel",
      avatar: "/api/placeholder/64/64",
      skills: ["Project Management", "Construction", "Engineering"],
      appliedFor: "School Infrastructure Improvement",
      appliedDate: "2025-03-22",
      message: "Though the project is completed, I'd like to join your NGO for future infrastructure projects."
    }
  ];
  
  // State for active tab in each section
  const [activeProjectsTab, setActiveProjectsTab] = useState("all");
  const [activeVolunteersTab, setActiveVolunteersTab] = useState("active");
  
  // Filter projects based on active tab
  const filteredProjects = () => {
    if (activeProjectsTab === "all") return projects;
    return projects.filter(project => project.status.toLowerCase() === activeProjectsTab);
  };
  
  // Filter volunteers based on active tab
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