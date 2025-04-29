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
  const { user, api, recommendationVersion } = useAuth();

  useEffect(() => {
    const fetchRecommendedProjects = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (!user?.uid) {
          throw new Error("Please login to view recommendations");
        }

        const response = await api.get(`/api/recommended?version=${recommendationVersion}`, {
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
          id: match.project.id,
          title: match.project.title,
          description: match.project.description,
          location: match.project.location,
          skills: match.project.skills || [],
          status: match.project.status,
          startedAt: match.project.startedAt,
          endedAt: match.project.endedAt,
          image: match.project.image || "/images/default-project.jpg",
          ngoName: match.project.ngoName || match.project.ngo?.orgName || "Unknown NGO",
          volunteers: match.project.volunteers || { enrolled: 0, required: 0 },
          matchScore: match.similarityScore
        }));

        setProjects(formattedProjects);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError(err.response?.status === 403 
          ? "Session expired. Please refresh the page." 
          : err.message || "Failed to load recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedProjects();
  }, [user?.uid, api, recommendationVersion]);

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