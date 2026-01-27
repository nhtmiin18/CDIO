import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 1, name: 'Dashboard', icon: '📊' },
    { id: 2, name: 'Profile', icon: '👤', active: true },
    { id: 3, name: 'Upload CV', icon: '📄' },
    { id: 4, name: 'Internships', icon: '💼' },
    { id: 5, name: 'Notifications', icon: '🔔' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>ISRS</h1>
        <h2>My Profile</h2>
      </div>
      
      <div className="sidebar-divider"></div>
      
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <a 
            key={item.id} 
            href="#" 
            className={`menu-item ${item.active ? 'active' : ''}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.name}</span>
          </a>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <p>© 2024 ISRS</p>
      </div>
    </div>
  );
};

export default Sidebar;