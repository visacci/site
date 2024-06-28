// src/pages/Projects.js
import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects">
      <h2>Projects</h2>
      <div className="project-list">
        <div className="project-item">
          <h3>Blog application</h3>
          <p>click here to vist</p>
        </div>
        <div className="project-item">
          <h3>Contacts app</h3>
          <p>click here to vist</p>
        </div>
        <div className="project-item">
          <h3>Chart aplication</h3>
          <p>click here to vist</p>
        </div>
        <div className="project-item">
          <h3>Notifications app</h3>
          <p>click here to vist</p>
        </div>
        {/* Add more projects as needed */}
      </div>
    </div>
  );
};

export default Projects;
