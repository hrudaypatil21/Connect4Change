import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  // Calculate progress based on enrolled volunteers (if available)
  const calculateProgress = () => {
    if (!project.volunteers || project.volunteers.required === 0) return 0;
    return Math.min(
      Math.round((project.volunteers.enrolled / project.volunteers.required) * 100),
      100
    );
  };

  const progressPercentage = calculateProgress();

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="project-card">
      <div className="project-image">
        <img
          src={project.image}
          alt={project.title}
          onError={(e) => {
            e.target.src = "/images/default-project.jpg"; // Fallback image
          }}
        />
        <div className="project-status">{project.status || "UPCOMING"}</div>
      </div>
     
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        
        {/* Add NGO name if available */}
        {project.ngoName && (
          <div className="project-ngo">
            <span className="ngo-label">Organized by:</span>
            <span className="ngo-name">{project.ngoName}</span>
          </div>
        )}
        
        <p className="project-description">{project.description}</p>
       
        <div className="project-details">
          <div className="project-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{project.location || "Multiple locations"}</span>
          </div>
         
          <div className="project-detail">
            <span className="detail-label">Dates:</span>
            <span className="detail-value">
              {formatDate(project.startedAt)} - {formatDate(project.endedAt)}
            </span>
          </div>
        </div>
       
        {project.skills && project.skills.length > 0 && (
          <div className="project-skills">
            <span className="skills-label">Skills needed:</span>
            <div className="skills-tags">
              {project.skills.slice(0, 3).map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="skill-tag more">+{project.skills.length - 3}</span>
              )}
            </div>
          </div>
        )}
       
        <div className="volunteers-section">
          <div className="volunteers-header">
            <span>Volunteers</span>
            <span>
              {project.volunteers?.enrolled || 0}/{project.volunteers?.required || "?"}
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
          <button className="action-button primary">View Details</button>
          <button className="action-button secondary">Join Project</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;