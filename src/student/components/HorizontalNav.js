import React from 'react';
import './HorizontalNav.css';
import { 
  FaTachometerAlt, 
  FaUser, 
  FaUpload, 
  FaBriefcase, 
  FaBell 
} from 'react-icons/fa';

const HorizontalNav = () => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', active: true },
    { icon: <FaUser />, label: 'Profile' },
    { icon: <FaUpload />, label: 'Upload CV' },
    { icon: <FaBriefcase />, label: 'Internships' },
    { icon: <FaBell />, label: 'Notifications', badge: 3 },
  ];

  return (
    <nav className="horizontal-nav">
      <div className="nav-container">
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href="#!" 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
            {item.active && <div className="active-indicator" />}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default HorizontalNav;