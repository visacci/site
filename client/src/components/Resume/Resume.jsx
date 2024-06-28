import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-container">
      <header className="resume-header">
        <h1>Katende Ibrahim</h1>
        <p>Software Developer</p>
        <p>Email: visacciallanz14@gmail.com | Phone: +256763304079</p>
      </header>

      <section className="resume-section">
        <h2>Education</h2>
        <div className="resume-item">
          <h3>Resposnsive web design Certification</h3>
          <h3>JavaScript Algorithms and data structres Certifaction</h3>
          <h3>Data visualisation Certification</h3>
          <h3>Frontend libraries Certifaction</h3>
          <p>Frecodecamp online school</p>
          <p>2020 - 2023</p>
        </div>
      </section>

      <section className="resume-section">
        <h2>Work Experience</h2>
        <div className="resume-item">
          <h3>Software Engineer</h3>
          <p>256 web solutions.</p>
          <p>2024 - Present (seasonal)</p>
          <ul>
            <li>
              Developed and maintained web applications using React and Node.js.
            </li>
            <li>
              Collaborated with cross-functional teams to deliver high-quality
              software.
            </li>
            <li>
              Implemented responsive design and ensured cross-browser
              compatibility.
            </li>
          </ul>
        </div>
      </section>

      <section className="resume-section">
        <h2>Skills</h2>
        <div className="resume-item">
          <ul>
            <li>JavaScript, React, Node.js</li>
            <li>HTML, CSS, SASS</li>
            <li>Git, GitHub, Agile methodologies</li>
            <li>Responsive Web Design</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Resume;
