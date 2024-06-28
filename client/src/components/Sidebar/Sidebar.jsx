// src/components/Sidebar.js
import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  // import img from "../../../images/1.jpg";
  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle(newState);
  };
  return (
    <div className="side">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "Close" : "Menu"}
      </button>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <img src="../../../public/1.jpg" alt="" className="profile" />
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
