import React from 'react';
import './Sidebar.css';
import { 
  FaTachometerAlt, 
  FaUser, 
  FaUpload, 
  FaBriefcase, 
  FaBell,
  FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', active: true },
    { icon: <FaUser />, label: 'Profile' },
    { icon: <FaUpload />, label: 'Upload CV' },
    { icon: <FaBriefcase />, label: 'Internships' },
    { icon: <FaBell />, label: 'Notifications' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Navigation</h3>
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <a 
            key={index} 
            href="#!" 
            className={`menu-item ${item.active ? 'active' : ''}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
            {item.active && <div className="active-indicator" />}
          </a>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;