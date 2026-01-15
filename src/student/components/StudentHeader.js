import React from 'react';
import './StudentHeader.css';
import { FaBell, FaCaretDown, FaUser, FaSearch } from 'react-icons/fa';

const StudentHeader = () => {
  return (
    <header className="student-header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-text">ISRS</span>
          <span className="logo-sub">Student Dashboard</span>
        </div>
        
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search internships, companies..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <div className="notification-icon">
          <FaBell />
          <span className="notification-badge">3</span>
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-details">
            <span className="user-name">Student Name</span>
            <span className="user-role">Computer Science</span>
          </div>
          <FaCaretDown className="dropdown-arrow" />
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;