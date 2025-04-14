import React, { useState, useEffect } from "react";
import ProjectCard from "./projectCard";
import "./Projects.css";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../AuthContext";

export default function ProjectsMatch() {
    const [searchTerm, setSearchTerm] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { user } = useAuth();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem('token');
          
          if (!token) {
            throw new Error('No authentication token found');
          }
    
          // Fetch projects based on user type
          let projectsUrl = `${API_BASE_URL}/api/projects`;
          if (user?.type === 'individual') {
            projectsUrl = `${API_BASE_URL}/api/projects/recommended?volunteerId=${user.id}`;
          }
          
          const projectsResponse = await axios.get(projectsUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          // Handle both regular projects and recommended projects (with scores)
          const projectsData = projectsResponse.data.map(item => 
            item.project ? { ...item.project, matchScore: item.similarityScore } : item
          );
          
          setProjects(projectsData);
          
          // If volunteer, fetch their applications
          if (user?.type === 'individual') {
            const appsResponse = await axios.get(
              `${API_BASE_URL}/api/applications?volunteerId=${user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setApplications(appsResponse.data);
          }
          
        } catch (err) {
          if (err.response?.status === 401) {
            setError("Session expired. Please login again.");
            // Optionally redirect to login
          } else {
            setError(err.response?.data?.message || "Failed to load data");
          }
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [user]);
  
  const handleApply = async (projectId) => {
    if (!user || user.type !== 'individual') {
      setError("You must be logged in as a volunteer to apply");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/applications`,
        { projectId, volunteerId: user.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      // Update the project's volunteer count
      setProjects(projects.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              volunteers: {
                ...project.volunteers,
                pending: project.volunteers.pending + 1
              }
            } 
          : project
      ));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit application");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>Community Projects</h2>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon fas fa-search"></i>
        </div>
      </div>

      <div className="dashboard-section">
      <h2 className="section-title">My Applications</h2>
      {applications.length === 0 ? (
        <p>You haven't applied to any projects yet</p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="application-item">
              <h3>{app.projectTitle}</h3>
              <p>Status: <span className={`status-${app.status.toLowerCase()}`}>{app.status}</span></p>
              <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>

      {filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>No projects found. Try a different search term.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onApply={handleApply}
              isVolunteer={user?.type === 'individual'}
            />
          ))}
        </div>
      )}
    </div>
  );
}