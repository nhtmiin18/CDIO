import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const menuItems = [
    { id: 1, name: 'Dashboard' },
    { id: 2, name: 'Profile', active: true },
    { id: 3, name: 'Upload CV' },
    { id: 4, name: 'Internships' },
    { id: 5, name: 'Notifications' }
  ];

  return (
    <nav className="navbar">
      {/* Phần bên trái: Logo và Student Info */}
      <div className="navbar-left">
        <div className="logo">
          <h1>ISRS</h1>
          <h2>Student Dashboard</h2>
        </div>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Search internships, companies..." 
            className="search-input"
          />
        </div>
      </div>

      {/* Phần bên phải: Menu và Student Name */}
      <div className="navbar-right">
        <div className="nav-menu">
          {menuItems.map((item) => (
            <a 
              key={item.id} 
              href="#" 
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        <div className="student-info">
          <div className="student-avatar">JS</div>
          <span className="student-name">Student Name</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;