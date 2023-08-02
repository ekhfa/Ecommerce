import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        &#9776;
      </button>
      <div className="sidebar-content">
        {/* Content for the sidebar */}
        <div className="sidebar-header">
          <h2>Categories</h2>
          <button className="close-button" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <ul className="category-list">
          <li>Electronics</li>
          <li>Clothing</li>
          <li>Home &amp; Living</li> 
          <li>Beauty &amp; Personal Care</li>
          <li>Books</li>
          {/* Add more categories */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
