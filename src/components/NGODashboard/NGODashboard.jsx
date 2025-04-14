import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NGODashboard.css";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

function NGODashboard() {
  const navigate = useNavigate();
  const [ngoInfo, setNgoInfo] = useState(null);
  const [activeProjects, setActiveProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [pendingVolunteers, setPendingVolunteers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);

  useEffect(() => {
    if (activeTab === "applications" && ngoInfo) {
      const fetchApplications = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/applications/ngo/${ngoInfo.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const allApplications = response.data || [];
          setApplications(allApplications);
          setPendingApplications(
            allApplications.filter((app) => app.status === "PENDING")
          );
        } catch (error) {
          console.error("Failed to fetch applications:", error);
        }
      };

      fetchApplications();
    }
  }, [activeTab, ngoInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || user.type !== "ngo") {
          navigate("/login-ngo");
          return;
        }

        // Use consistent ID - prefer UID for Firebase-based lookups
        const identifier = user.uid || user.id;

        // Fetch NGO profile
        const profileResponse = await axios.get(
          `${API_BASE_URL}/api/ngo-profile/${identifier}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Use response data for all fields
        setNgoInfo({
          id: profileResponse.data.id,
          uid: user.uid,
          orgName: profileResponse.data.orgName,
          email: profileResponse.data.email || user.email,
          phone: profileResponse.data.orgPhone,
          address: profileResponse.data.orgAddress,
          mission: profileResponse.data.orgMission,
          website: profileResponse.data.orgWebsite,
          logo: profileResponse.data.logo || "/default-ngo-logo.png",
          description: profileResponse.data.description,
          contactPerson: profileResponse.data.contactPerson,
          location: profileResponse.data.location,
          volNeeds: profileResponse.data.volNeeds || [],
          verified: profileResponse.data.isVerified,
          createdAt: profileResponse.data.createdAt,
        });

        // Fetch projects using the database ID from the profile response
        const projectsResponse = await axios.get(
          `${API_BASE_URL}/api/projects/ngo/${profileResponse.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const activeProjects = projectsResponse.data.filter(
          (project) =>
            project.status === "UPCOMING" || project.status === "ACTIVE"
        );
        const completedProjects = projectsResponse.data.filter(
          (project) => project.status === "COMPLETED"
        );

        setActiveProjects(activeProjects);
        setCompletedProjects(completedProjects);

        // Rest of your data fetching...
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        if (error.response?.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login-ngo");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login-ngo");
  };

  const handleVolunteerStatusChange = async (volunteerId, status) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/volunteers/${volunteerId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (status === "Approved") {
        const volunteer = pendingVolunteers.find((v) => v.id === volunteerId);
        setVolunteers([...volunteers, { ...volunteer, status: "Active" }]);
        setPendingVolunteers(
          pendingVolunteers.filter((v) => v.id !== volunteerId)
        );
      } else {
        setPendingVolunteers(
          pendingVolunteers.filter((v) => v.id !== volunteerId)
        );
      }
    } catch (error) {
      console.error("Failed to update volunteer status:", error);
    }
  };

  const handleApplicationStatusChange = async (applicationId, status) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/applications/${applicationId}/status`,
        null,
        {
          params: { status },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the UI
      setApplications(
        applications.map((app) =>
          app.id === applicationId ? response.data : app
        )
      );

      setPendingApplications(
        pendingApplications.filter((app) => app.id !== applicationId)
      );

      // Show success message
      setNotifications([
        {
          id: Date.now(),
          type: "success",
          content: `Application ${status.toLowerCase()} successfully`,
          time: "Just now",
          unread: true,
        },
        ...notifications,
      ]);
    } catch (error) {
      console.error("Failed to update application status:", error);
      setError("Failed to update application status");
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

  if (!ngoInfo) {
    return <div>Error loading dashboard. Please try again.</div>;
  }

  return (
    <div className="ngo-dashboard">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="ngo-profile">
            <img
              src={ngoInfo.logo}
              alt={ngoInfo.orgName}
              className="ngo-logo"
            />
            <div className="ngo-info">
              <div className="ngo-name-container">
                <h1 className="ngo-name">{ngoInfo.orgName}</h1>
                {ngoInfo.verified && (
                  <span
                    className="verified-badge"
                    title="Verified Organization"
                  >
                    <i className="fas fa-check-circle"></i>
                  </span>
                )}
              </div>
              <p className="ngo-description">{ngoInfo.mission}</p>
              <div className="ngo-tags">
                {ngoInfo.volNeeds.slice(0, 3).map((need, index) => (
                  <span key={index} className="tag tag-blue">
                    {need}
                  </span>
                ))}
                {ngoInfo.volNeeds.length > 3 && (
                  <span className="tag tag-blue">
                    +{ngoInfo.volNeeds.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="dashboard-actions">
            <Link to="/create-project">
              <button className="primary-button">
                <i className="fas fa-plus"></i> Create Project
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
                <h3 className="sidebar-title">Organization Details</h3>
                <ul className="sidebar-list">
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
                    <span className="item-value">
                      {ngoInfo.phone || "Not provided"}
                    </span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-map-marker-alt"></i> Location:
                    </span>
                    <span className="item-value">
                      {ngoInfo.location || "Not specified"}
                    </span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-globe"></i> Website:
                    </span>
                    <span className="item-value">
                      {ngoInfo.website ? (
                        <a
                          href={
                            ngoInfo.website.startsWith("http")
                              ? ngoInfo.website
                              : `https://${ngoInfo.website}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {ngoInfo.website}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </span>
                  </li>
                  <li className="sidebar-item">
                    <span className="item-label">
                      <i className="fas fa-calendar"></i> Member Since:
                    </span>
                    <span className="item-value">
                      {new Date(ngoInfo.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Volunteer Needs</h3>
                <div className="volunteer-needs">
                  {ngoInfo.volNeeds.length > 0 ? (
                    ngoInfo.volNeeds.map((need, index) => (
                      <div key={index} className="need-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{need}</span>
                      </div>
                    ))
                  ) : (
                    <p className="no-needs">No specific needs listed</p>
                  )}
                </div>
              </div>

              <div className="sidebar-section">
                <h3 className="sidebar-title">Organization Stats</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">
                      {activeProjects.length + completedProjects.length}
                    </span>
                    <span className="stat-label">Total Projects</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{volunteers.length}</span>
                    <span className="stat-label">Active Volunteers</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">
                      {volunteers.reduce(
                        (sum, volunteer) => sum + volunteer.hoursContributed,
                        0
                      )}
                    </span>
                    <span className="stat-label">Volunteer Hours</span>
                  </div>
                </div>
              </div>

              {notifications.length > 0 && (
                <div className="sidebar-section">
                  <h3 className="sidebar-title">Notifications</h3>
                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${
                          notification.unread ? "unread" : ""
                        }`}
                      >
                        <div className="notification-icon">
                          {notification.type === "application" && (
                            <i className="fas fa-user-plus"></i>
                          )}
                          {notification.type === "message" && (
                            <i className="fas fa-envelope"></i>
                          )}
                        </div>
                        <div className="notification-content">
                          <p className="notification-text">
                            {notification.content}
                          </p>
                          <p className="notification-meta">
                            <span className="notification-from">
                              {notification.from}
                            </span>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Main Dashboard Content */}
            <div className="dashboard-main">
              {/* Tabs Navigation */}
              <div className="dashboard-tabs">
                <button
                  className={`tab ${activeTab === "projects" ? "active" : ""}`}
                  onClick={() => setActiveTab("projects")}
                >
                  <i className="fas fa-project-diagram"></i> Projects
                </button>
                <button
                  className={`tab ${
                    activeTab === "volunteers" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("volunteers")}
                >
                  <i className="fas fa-users"></i> Volunteers
                </button>
                <button
                  className={`tab ${
                    activeTab === "applications" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("applications")}
                >
                  <i className="fas fa-user-plus"></i> Applications
                </button>
              </div>

              {/* Projects Tab */}
              {activeTab === "applications" && (
                <div className="dashboard-section">
                  <h2 className="section-title">Volunteer Applications</h2>

                  {pendingApplications.length > 0 ? (
                    <div className="applications-list">
                      {pendingApplications.map((application) => (
                        <div key={application.id} className="application-card">
                          <div className="application-header">
                            <div className="volunteer-info">
                              <div className="volunteer-avatar">
                                {application.volunteerName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                              <div>
                                <h3>{application.volunteerName}</h3>
                                <p>Applied to: {application.projectTitle}</p>
                              </div>
                            </div>
                            <span
                              className={`status-badge ${application.status.toLowerCase()}`}
                            >
                              {application.status}
                            </span>
                          </div>

                          <div className="application-meta">
                            <span>
                              Applied on:{" "}
                              {new Date(
                                application.appliedAt
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="application-actions">
                            <button
                              className="approve-btn"
                              onClick={() =>
                                handleApplicationStatusChange(
                                  application.id,
                                  "APPROVED"
                                )
                              }
                            >
                              <i className="fas fa-check"></i> Approve
                            </button>
                            <button
                              className="reject-btn"
                              onClick={() =>
                                handleApplicationStatusChange(
                                  application.id,
                                  "REJECTED"
                                )
                              }
                            >
                              <i className="fas fa-times"></i> Reject
                            </button>
                            <button className="message-btn">
                              <i className="fas fa-envelope"></i> Message
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-user-plus"></i>
                      <p>No pending applications</p>
                    </div>
                  )}
                </div>
              )}

              {/* Volunteers Tab */}
              {activeTab === "volunteers" && (
                <div className="dashboard-section">
                  <h2 className="section-title">Your Volunteers</h2>

                  {volunteers.length > 0 ? (
                    <div className="volunteers-list">
                      {volunteers.map((volunteer) => (
                        <div key={volunteer.id} className="volunteer-item">
                          <div className="volunteer-avatar">
                            {volunteer.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="volunteer-details">
                            <h3 className="volunteer-name">{volunteer.name}</h3>
                            <p className="volunteer-email">{volunteer.email}</p>
                            <div className="volunteer-skills">
                              {volunteer.skills
                                .slice(0, 3)
                                .map((skill, index) => (
                                  <span key={index} className="tag tag-blue">
                                    {skill}
                                  </span>
                                ))}
                              {volunteer.skills.length > 3 && (
                                <span className="tag tag-blue">
                                  +{volunteer.skills.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="volunteer-stats">
                            <div className="stat-item">
                              <span className="stat-label">Hours</span>
                              <span className="stat-value">
                                {volunteer.hoursContributed}
                              </span>
                            </div>
                            <div className="stat-item">
                              <span className="stat-label">Projects</span>
                              <span className="stat-value">
                                {volunteer.projectsCount}
                              </span>
                            </div>
                          </div>
                          <div className="volunteer-actions">
                            <button className="volunteer-action-btn">
                              <i className="fas fa-envelope"></i> Message
                            </button>
                            <button className="volunteer-action-btn">
                              <i className="fas fa-tasks"></i> Assign Task
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-users"></i>
                      <p>No active volunteers found</p>
                    </div>
                  )}
                </div>
              )}

              {/* Applications Tab */}
              {activeTab === "applications" && (
                <div className="dashboard-section">
                  <h2 className="section-title">Volunteer Applications</h2>

                  {pendingApplications.length > 0 ? (
                    <div className="applications-list">
                      {pendingApplications.map((application) => (
                        <div key={application.id} className="application-item">
                          <div className="application-header">
                            <div className="applicant-info">
                              <div className="applicant-avatar">
                                {application.volunteerName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                              <div>
                                <h3 className="applicant-name">
                                  {application.volunteerName}
                                </h3>
                                <p className="applicant-project">
                                  Applied to: {application.projectTitle}
                                </p>
                              </div>
                            </div>
                            <span
                              className={`application-status status-${application.status.toLowerCase()}`}
                            >
                              {application.status}
                            </span>
                          </div>

                          <div className="application-details">
                            <div className="detail-item">
                              <span className="detail-label">Applied On:</span>
                              <span className="detail-value">
                                {new Date(
                                  application.appliedAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="application-actions">
                            <button
                              className="approve-btn"
                              onClick={() =>
                                handleApplicationStatusChange(
                                  application.id,
                                  "APPROVED"
                                )
                              }
                            >
                              <i className="fas fa-check"></i> Approve
                            </button>
                            <button
                              className="reject-btn"
                              onClick={() =>
                                handleApplicationStatusChange(
                                  application.id,
                                  "REJECTED"
                                )
                              }
                            >
                              <i className="fas fa-times"></i> Reject
                            </button>
                            <button className="message-btn">
                              <i className="fas fa-envelope"></i> Message
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <i className="fas fa-user-plus"></i>
                      <p>No pending applications</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NGODashboard;
