import React, { useState } from "react";
import ProjectCard from "./projectCard"; // Import the ProjectCard component
import "./projects.css";

export default function Project() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const projects = [
    {
      id: 1,
      name: "Mumbai Beach Cleanup Drive",
      description:
        "Join us in cleaning up the beaches of Mumbai and making them plastic-free.",
      status: "Upcoming",
      sdgs: ["SDG 14", "SDG 15"],
      volunteersNeeded: 20,
      imageSrc: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "Versova Beach Restoration",
      description:
        "Help restore the beauty of Versova Beach by participating in our cleanup activities.",
      status: "Upcoming",
      sdgs: ["SDG 14", "SDG 15"],
      volunteersNeeded: 15,
      imageSrc: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "Juhu Beach Cleanup Campaign",
      description:
        "Join our campaign to clean Juhu Beach and raise awareness about marine pollution.",
      status: "Upcoming",
      sdgs: ["SDG 14", "SDG 15"],
      volunteersNeeded: 25,
      imageSrc: "/api/placeholder/300/200",
    },
    {
      id: 4,
      name: "Dadar Beach Cleanup Initiative",
      description:
        "Participate in our initiative to clean Dadar Beach and protect marine life.",
      status: "Upcoming",
      sdgs: ["SDG 14", "SDG 15"],
      volunteersNeeded: 10,
      imageSrc: "/api/placeholder/300/200",
    },
    {
      id: 5,
      name: "Marine Drive Beach Cleanup",
      description:
        "Join us in cleaning Marine Drive Beach and promoting a cleaner environment.",
      status: "Ongoing",
      sdgs: ["SDG 14", "SDG 15"],
      volunteersNeeded: 30,
      imageSrc: "/api/placeholder/300/200",
    },
    {
      id: 6,
      name: "Girgaum Chowpatty Cleanup",
      description:
        "Help us maintain the cleanliness of Girgaum Chowpatty Beach through regular cleanups.",
      status: "Completed",
      sdgs: ["SDG 14", "SDG 15"],
      volunteersNeeded: 0,
      imageSrc: "/api/placeholder/300/200",
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