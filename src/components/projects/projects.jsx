import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);

  // In a real app, you would fetch projects from your backend/API
  // For now, we'll simulate loading projects from localStorage
  useEffect(() => {
    // Load projects from localStorage or use demo data if none exists
    const loadProjects = () => {
      try {
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
          return JSON.parse(savedProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      }
      
      // Return demo projects if no saved projects exist
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
          }
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
          }
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
          }
        }
      ];
    };

    setProjects(loadProjects());
  }, []);

  // Add a new project (this would be called from CreateProject component)
  const addProject = (newProject) => {
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    
    // Save to localStorage
    try {
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    } catch (error) {
      console.error("Error saving projects:", error);
    }
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.location.toLowerCase().includes(searchLower)
    );
  });

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

      {filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>No projects found. Try a different search term or create a new project.</p>
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