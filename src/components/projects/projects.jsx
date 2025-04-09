import React, { useState, useEffect } from "react";
import ProjectCard from "./projectCard";
import "./Projects.css";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadProjects = () => {
        try {
          const savedProjects = localStorage.getItem("projects");
          if (savedProjects) {
            return JSON.parse(savedProjects);
          }
        } catch (error) {
          console.error("Error loading projects:", error);
        }
        
        return [
          {
            id: 1,
            title: "Mumbai Beach Cleanup Drive",
            description: "Join us in cleaning up the beaches of Mumbai and making them plastic-free.",
            startDate: "2025-04-15",
            endDate: "2025-04-30",
            location: "Mumbai, Maharashtra",
            sdgs: ["SDG 14", "SDG 15"],
            status: "Planning",
            progress: 0,
            volunteers: {
              required: 20,
              enrolled: 0,
              pending: 0
            },
            image:"src/assets/images/mumbai beach.jpg",
          },
          {
            id: 2,
            title: "Versova Beach Restoration",
            description: "Help restore the beauty of Versova Beach by participating in our cleanup activities.",
            startDate: "2025-05-01",
            endDate: "2025-05-15",
            location: "Versova, Mumbai",
            sdgs: ["SDG 14", "SDG 15"],
            status: "Planning",
            progress: 0,
            volunteers: {
              required: 15,
              enrolled: 0,
              pending: 0
            },image:"src/assets/images/versova beach.jpg",
          },
          {
            id: 3,
            title: "Rural Education Initiative",
            description: "Volunteer to teach underprivileged children in rural areas and help improve literacy rates.",
            startDate: "2025-04-10",
            endDate: "2025-06-10",
            location: "Pune District, Maharashtra",
            sdgs: ["SDG 4", "SDG 10"],
            status: "In Progress",
            progress: 25,
            volunteers: {
              required: 10,
              enrolled: 4,
              pending: 2
            },
            image:"src/assets/images/rural edu.jpg",
          }
        ];
      };

      setProjects(loadProjects());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower) ||
      project.sdgs.some(sdg => sdg.toLowerCase().includes(searchLower))
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
            placeholder="Search projects..."
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
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>
            {searchTerm 
              ? "No projects found. Try a different search term or create a new project."
              : "There are currently no projects available. Create one to get started!"}
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