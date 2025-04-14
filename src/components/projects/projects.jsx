import React, { useState, useEffect } from "react";
import ProjectCard from "./projectCard";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { API_BASE_URL } from "../../config/api"; // Adjust the import based on your project structure
import "./Projects.css";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { api, user  } = useAuth(); 

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Create a new axios instance without auth headers for public requests
        const publicApi = axios.create({
          baseURL: API_BASE_URL
        });
        
        const response = await publicApi.get('/api/projects');
        const randomizedProjects = [...response.data].sort(() => Math.random() - 0.5);
        setProjects(randomizedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        if (err.response?.status === 403) {
          setError("You don't have permission to view projects");
        } else {
          setError(err.response?.data?.message || "Failed to load projects. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllProjects();
}, [api]);
  
  const filteredProjects = projects.filter((project) => {
    if (!searchTerm.trim()) return true;
   
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower) ||
      project.location?.toLowerCase().includes(searchLower) ||
      (project.skills && project.skills.some(skill => skill.toLowerCase().includes(searchLower))) ||
      (project.ngoName && project.ngoName.toLowerCase().includes(searchLower))
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
            <ProjectCard 
            project={project} 
            user={user} 
            key={project.id} 
          />
          ))}
        </div>
      )}
    </div>
  );
}