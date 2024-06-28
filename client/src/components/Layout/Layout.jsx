// src/components/Layout.js
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className={`layout ${isSidebarOpen ? "layout-sidebar-open" : ""}`}>
      <Sidebar onToggle={handleSidebarToggle} />
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
