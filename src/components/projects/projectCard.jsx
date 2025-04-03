import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css"; // Import the CSS file

export default function ProjectCard({ imageSrc, projectName, projectDescription, projectStatus, projectSdgs }) {
    return (
        <div className="project-card">
            <div className="project-image">
                <img src={imageSrc} alt="Project" />
            </div>
            <div className="project-details">
                <h3 className="project-name">{projectName}</h3>
                <p className="project-description">
                    {projectDescription}
                </p>
                <div className="project-metadata">
                    <span className="project-status">{projectStatus}</span>
                    <span className="project-sdgs">{projectSdgs}</span>
                </div>
                <div className="project-actions">
                    {/* <Link to ="/volunteer-form"> */}
                    <button className="volunteer-button">Volunteer</button>
                    {/* </Link> */}
                    <button className="donate-button">Donate</button>
                </div>
            </div>
        </div>
    );
}
