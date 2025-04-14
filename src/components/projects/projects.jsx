import React, { useState, useEffect } from "react";
import ProjectCard from "./projectCard";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import "./Projects.css";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, getFreshToken } = useAuth();

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get fresh token
        const token = await getFreshToken();
        if (!token) {
          throw new Error("No authentication token available");
        }

        const response = await axios.get(`${API_BASE_URL}/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Randomize project order
        const randomizedProjects = [...response.data].sort(() => Math.random() - 0.5);
        setProjects(randomizedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.response?.data?.message || "Failed to load projects. Please try again.");
        
        // If unauthorized, suggest re-login
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if user is authenticated
    if (user) {
      fetchAllProjects();
    } else {
      setError("Please login to view projects");
      setIsLoading(false);
    }
  }, [user, getFreshToken]);

  const filteredProjects = projects.filter((project) => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower) ||
      (project.skills && project.skills.some(skill => skill.toLowerCase().includes(searchLower)))
    );
  });

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h2>Community Projects</h2>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search projects by title, description, location or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon"></i>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="clear-search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>
            {searchTerm 
              ? "No projects match your search. Try different keywords."
              : "There are currently no projects available."}
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}