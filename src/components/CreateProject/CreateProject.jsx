import React, { useState } from "react";
import "./CreateProject.css";

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    sdgs: [],
    status: "Planning",
    volunteersRequired: 0
  });

  const availableSdgs = [
    { id: "SDG 1", name: "No Poverty" },
    { id: "SDG 2", name: "Zero Hunger" },
    { id: "SDG 3", name: "Good Health and Well-being" },
    { id: "SDG 4", name: "Quality Education" },
    { id: "SDG 5", name: "Gender Equality" },
    { id: "SDG 9", name: "Industry, Innovation and Infrastructure" },
    { id: "SDG 17", name: "Partnerships for the Goals" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value
    });
  };

  const handleSdgToggle = (sdgId) => {
    if (projectData.sdgs.includes(sdgId)) {
      setProjectData({
        ...projectData,
        sdgs: projectData.sdgs.filter(id => id !== sdgId)
      });
    } else {
      setProjectData({
        ...projectData,
        sdgs: [...projectData.sdgs, sdgId]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      ...projectData,
      id: Date.now(),
      progress: 0,
      volunteers: {
        required: parseInt(projectData.volunteersRequired),
        enrolled: 0,
        pending: 0
      }
    };

    console.log("Project Submitted:", newProject);

    // Reset form
    setProjectData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      sdgs: [],
      status: "Planning",
      volunteersRequired: 0
    });
  };

  return (
    <div className="create-project-page">
      <div className="create-project-container">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={projectData.title}
              onChange={handleChange}
              required
              placeholder="Enter project title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              required
              placeholder="Describe your project and its objectives"
              rows="4"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={projectData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={projectData.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={projectData.location}
              onChange={handleChange}
              required
              placeholder="Project location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Project Status *</label>
            <select
              id="status"
              name="status"
              value={projectData.status}
              onChange={handleChange}
              required
            >
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="volunteersRequired">Volunteers Required *</label>
            <input
              type="number"
              id="volunteersRequired"
              name="volunteersRequired"
              value={projectData.volunteersRequired}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Sustainable Development Goals (SDGs) *</label>
            <div className="sdgs-container">
              {availableSdgs.map((sdg) => (
                <div className="sdg-checkbox" key={sdg.id}>
                  <input
                    type="checkbox"
                    id={`sdg-${sdg.id}`}
                    checked={projectData.sdgs.includes(sdg.id)}
                    onChange={() => handleSdgToggle(sdg.id)}
                  />
                  <label htmlFor={`sdg-${sdg.id}`}>
                    {sdg.id}: {sdg.name}
                  </label>
                </div>
              ))}
            </div>
            {projectData.sdgs.length === 0 && (
              <p className="error-text">Please select at least one SDG</p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={projectData.sdgs.length === 0}>
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
