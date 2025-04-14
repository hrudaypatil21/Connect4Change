import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import "./CreateProject.css";

const CreateProject = () => {
  const navigate = useNavigate();
  const { user, getFreshToken } = useAuth(); // Get getFreshToken here
  const [skillsInput, setSkillsInput] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    startedAt: "",
    endedAt: "",
    location: "",
    skills: [],
    status: "UPCOMING",
    ngoId: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth(); 

  useEffect(() => {
    if (user?.type !== 'ngo') {
      navigate('/');
    } else {
      setProjectData(prev => ({
        ...prev,
        ngoId: user.id
      }));
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value
    });
  };

  const handleSkillAdd = () => {
    if (skillsInput.trim() && !projectData.skills.includes(skillsInput.trim())) {
      setProjectData({
        ...projectData,
        skills: [...projectData.skills, skillsInput.trim()]
      });
      setSkillsInput("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setProjectData({
      ...projectData,
      skills: projectData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      const token = await getFreshToken();
      if (!token) throw new Error('No authentication token found');
  
      // Prepare project data without ngoId (it will be set by backend)
      const projectToCreate = {
        title: projectData.title,
        description: projectData.description,
        status: projectData.status,
        startedAt: projectData.startedAt ? `${projectData.startedAt}T00:00:00` : null,
        endedAt: projectData.endedAt ? `${projectData.endedAt}T00:00:00` : null,
        location: projectData.location,
        skills: projectData.skills
      };
  
      const response = await axios.post(
        `${API_BASE_URL}/api/projects`,
        projectToCreate,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      navigate("/ngo-dashboard");
    } catch (error) {
      console.error("Project creation error:", error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        navigate('/login');
      } else if (error.response?.status === 403) {
        setError('You don\'t have permission to create projects');
      } else {
        setError(error.response?.data?.error || error.message || 'Failed to create project');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-project-page">
      <div className="create-project-container">
        <h2>Create New Project</h2>
        {error && <div className="error-message">{error}</div>}
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
              <label htmlFor="startedAt">Start Date *</label>
              <input
                type="date"
                id="startedAt"
                name="startedAt"
                value={projectData.startedAt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endedAt">End Date</label>
              <input
                type="date"
                id="endedAt"
                name="endedAt"
                value={projectData.endedAt}
                onChange={handleChange}
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
              <option value="UPCOMING">Upcoming</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="form-group">
            <label>Required Skills</label>
            <div className="skills-input-container">
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Add required skills"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
              />
              <button 
                type="button" 
                className="add-skill-button"
                onClick={handleSkillAdd}
              >
                Add Skill
              </button>
            </div>
            <div className="skills-tags-container">
              {projectData.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                  <button 
                    type="button" 
                    className="remove-skill"
                    onClick={() => handleSkillRemove(skill)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;