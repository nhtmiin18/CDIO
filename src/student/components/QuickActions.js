import React from 'react';
import './QuickActions.css';
import { FaUpload, FaUserEdit, FaBell } from 'react-icons/fa';

const QuickActions = () => {
  const actions = [
    {
      icon: <FaUpload />,
      label: 'UPLOAD NEW CV',
      color: '#3498db',
      description: 'Update your resume'
    },
    {
      icon: <FaUserEdit />,
      label: 'UPDATE PROFILE',
      color: '#9b59b6',
      description: 'Edit personal info'
    },
    {
      icon: <FaBell />,
      label: 'VIEW NOTIFICATIONS',
      color: '#e74c3c',
      description: 'Check new alerts'
    },
  ];

  return (
    <div className="actions-card">
      <div className="card-header">
        <h3>Quick Actions</h3>
      </div>
      
      <div className="actions-grid">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className="action-button"
            style={{ 
              background: `linear-gradient(135deg, ${action.color}, ${adjustColor(action.color, -20)})`,
              '--hover-color': adjustColor(action.color, -30)
            }}
          >
            <div className="action-icon">
              {action.icon}
            </div>
            <div className="action-content">
              <span className="action-label">{action.label}</span>
              <span className="action-desc">{action.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
  return '#' + color.replace(/^#/, '').replace(/../g, color => 
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  );
};

export default QuickActions;