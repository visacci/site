// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import About from "../About/About";
import Projects from "../Projects/Projects";
import Header from "../Header/Header";
import ContactForm from "../Contact/Contact";
import Resume from "../Resume/Resume";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        {/* <Header /> */}
        <Layout>
          <Routes>
            <Route path="/" exact element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/resume" element={<Resume />} /> */}
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
