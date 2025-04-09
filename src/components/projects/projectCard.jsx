import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  // Calculate progress based on enrolled volunteers
  const calculateProgress = () => {
    if (project.volunteers.required === 0) return 100;
    return Math.min(
      Math.round((project.volunteers.enrolled / project.volunteers.required) * 100),
      100
    );
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="project-card">
      <div className="project-image">
        <img src={project.image} />
        <div className="project-status">{project.status}</div>
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-details">
          <div className="project-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{project.location}</span>
          </div>
          
          <div className="project-detail">
            <span className="detail-label">Dates:</span>
            <span className="detail-value">
              {new Date(project.startDate).toLocaleDateString()} - 
              {new Date(project.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="project-sdgs">
          {project.sdgs.map((sdg) => (
            <span key={sdg} className="sdg-tag">
              {sdg}
            </span>
          ))}
        </div>
        
        <div className="volunteers-section">
          <div className="volunteers-header">
            <span>Volunteers</span>
            <span>
              {project.volunteers.enrolled}/{project.volunteers.required}
            </span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="project-actions">
          <button className="action-button primary">Join Project</button>
          <button className="action-button secondary">More Details</button>
          <button className="action-button tertiary">Donate</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;