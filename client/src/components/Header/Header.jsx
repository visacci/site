import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  return (
    <div className="header">
      <div className="title">Katende Ibrahim</div>
      <div className="ul">
        <Link to={"/resume"}>
          <li className="item">Resume</li>
        </Link>
        <Link to={"/projects"}>
          <li className="item">Projects</li>
        </Link>
        <div className="item mode">Mode</div>
      </div>
    </div>
  );
}
