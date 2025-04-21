import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import ProjectCard from "./projectCard";
import "./RecommendedProjects.css";

export default function ProjectsMatch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, getFreshToken, api } = useAuth();

  useEffect(() => {
    const fetchRecommendedProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user?.uid) {
          throw new Error("Please login to view recommendations");
        }

        const token = await getFreshToken(); // Use getFreshToken instead of user.getIdToken()
        
        const response = await api.get("/api/projects/recommended", {
          params: { volunteerId: user.uid },
          headers: { 
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (!response.data) {
          throw new Error("No data received");
        }

        const formattedProjects = response.data.map((match) => ({
          ...match.project,
          matchScore: match.similarityScore,
          ngoName: match.project.ngo?.orgName || "Unknown NGO",
        }));

        setProjects(formattedProjects);
      
      } catch (err) {
        if (err.response?.status === 403) {
          // Handle specific 403 cases
          if (err.response.data?.message?.contains("UID mismatch")) {
            setError("You can only view your own recommendations");
          } else {
            setError("Please login to view recommendations");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedProjects();
  }, [user?.uid, getFreshToken, api]);

  const filteredProjects = projects.filter((project) => {
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      project.title?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower) ||
      project.location?.toLowerCase().includes(searchLower) ||
      (project.skills &&
        project.skills.some((skill) =>
          skill.toLowerCase().includes(searchLower)
        )) ||
      project.ngoName?.toLowerCase().includes(searchLower)
    );
  });

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>Recommended Projects</h2>
        <p className="subtitle">
          These projects match your skills and interests
        </p>

        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search recommended projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon"></i>
          {searchTerm && (
            <button onClick={clearSearch} className="clear-search">
              ×
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <div className="error-message">
          {error}
          {error.includes("authenticated") && (
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          )}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>
            {searchTerm
              ? "No recommended projects match your search."
              : "No projects currently match your profile. Update your skills or check back later."}
          </p>
          {!searchTerm && (
            <button
              className="browse-all-button"
              onClick={() => (window.location.href = "/projects")}
            >
              Browse All Projects
            </button>
          )}
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              user={user}
              highlightMatch={true}
              matchScore={project.matchScore}
            />
          ))}
        </div>
      )}
    </div>
  );
}
