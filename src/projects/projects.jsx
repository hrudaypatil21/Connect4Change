import React, { useState } from "react";
import ProjectCard from "./projectCard"; // Import the ProjectCard component
import "./projects.css";

export default function Project() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const projects = [
    {
      id: 1,
      name: "Digital Literacy for Rural Schools",
      description:
        "Providing computer training and digital skills to children in underserved rural communities.",
      status: "Ongoing",
      sdgs: ["SDG 4", "SDG 17"],
      volunteersNeeded: 5,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
    {
      id: 2,
      name: "Microentrepreneur Mentorship",
      description:
        "Connecting business professionals with local entrepreneurs to provide guidance and support for sustainable businesses.",
      status: "Upcoming",
      sdgs: ["SDG 8", "SDG 17"],
      volunteersNeeded: 3,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
    {
      id: 3,
      name: "Community Health Awareness",
      description:
        "Organizing health camps and awareness programs in underserved communities about preventive healthcare.",
      status: "Ongoing",
      sdgs: ["SDG 3", "SDG 17"],
      volunteersNeeded: 8,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
    {
      id: 4,
      name: "Clean Water Initiative",
      description:
        "Installing water filtration systems in rural villages to provide access to clean drinking water.",
      status: "Upcoming",
      sdgs: ["SDG 6", "SDG 17"],
      volunteersNeeded: 10,
      imageSrc: "/api/placeholder/300/200", // Add image source
    },
  ];

  // Filter projects based on search term (name or description)
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      {/* Search Input */}
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search by name or description"
          aria-label="Search"
          aria-describedby="search-addon"
          value={searchTerm} // Bind search term to state
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        <span className="input-group-text border-0" id="search-addon">
          <i className="fas fa-search"></i>
        </span>
      </div>

      {/* Projects Container */}
      <div className="projects-container">
        {filteredProjects.map((project) => (
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
    </>
  );
}