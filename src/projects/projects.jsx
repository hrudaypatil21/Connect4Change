import React from "react";
import ProjectCard from "./ProjectCard"; // Import the ProjectCard component
import "./projects.css"; 

export default function Project() {
  const projects = [
    {
      id: 1,
      name: "Digital Literacy for Rural Schools",
      description: "Providing computer training and digital skills to children in underserved rural communities.",
      status: "Ongoing",
      sdgs: ["SDG 4", "SDG 17"],
      volunteersNeeded: 5,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
    {
      id: 2,
      name: "Microentrepreneur Mentorship",
      description: "Connecting business professionals with local entrepreneurs to provide guidance and support for sustainable businesses.",
      status: "Upcoming",
      sdgs: ["SDG 8", "SDG 17"],
      volunteersNeeded: 3,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
    {
      id: 3,
      name: "Community Health Awareness",
      description: "Organizing health camps and awareness programs in underserved communities about preventive healthcare.",
      status: "Ongoing",
      sdgs: ["SDG 3", "SDG 17"],
      volunteersNeeded: 8,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
    {
      id: 4,
      name: "Clean Water Initiative",
      description: "Installing water filtration systems in rural villages to provide access to clean drinking water.",
      status: "Upcoming",
      sdgs: ["SDG 6", "SDG 17"],
      volunteersNeeded: 10,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
  ];

  return (
    <div className="projects-container">
      {projects.map((project) => (
        <ProjectCard
          key={project.id} // Unique key for each project
          imageSrc={project.imageSrc}
          projectName={project.name}
          projectDescription={project.description}
          projectStatus={project.status}
          projectSdgs={project.sdgs}
        />
      ))}
    </div>
  );
}