import React, { useState } from "react";
import { Link } from "react-router-dom";
import './website.css';

function Website() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = () => {
    const pages = ["home", "about", "contact"];
    const found = pages.find(
      (page) => page.toLowerCase() === searchQuery.toLowerCase()
    );
    if (found) {
      window.location.href = `/${found}`;
    } else {
      alert("Page not found");
    }
  };

  return (
    <div className="container">
      <button className="menu-btn" onClick={toggleSidebar}>
        &#9776;
      </button>

      {isOpen && (
        <div className="sidebar">
          <input
            type="text"
            placeholder="Search page..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="sidebar-input"
          />
          <button onClick={handleSearch} className="sidebar-btn">
            Search
          </button>

          <Link to="/home" className="sidebar-btn" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="sidebar-btn" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="sidebar-btn" onClick={() => setIsOpen(false)}>
            Contact
          </Link>
        </div>
      )}

      <div className="content">
        <h1>Welcome to My Website</h1>
      </div>
    </div>
  );
}

export default Website;
