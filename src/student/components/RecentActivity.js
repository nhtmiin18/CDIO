import React from 'react';
import './RecentActivity.css';
import { FaUpload, FaUserEdit, FaBriefcase, FaUserPlus } from 'react-icons/fa';

const RecentActivity = () => {
  const activities = [
    { 
      icon: <FaUpload />, 
      text: 'CV uploaded and parsed successfully', 
      time: '2 days ago',
      color: '#3498db'
    },
    { 
      icon: <FaUserEdit />, 
      text: 'Profile updated', 
      time: '5 days ago',
      color: '#9b59b6'
    },
    { 
      icon: <FaBriefcase />, 
      text: 'New match found: Backend Developer intern', 
      time: '1 week ago',
      color: '#27ae60'
    },
    { 
      icon: <FaUserPlus />, 
      text: 'Account created', 
      time: '2 weeks ago',
      color: '#e74c3c'
    },
  ];

  return (
    <div className="activity-card">
      <div className="card-header">
        <h3>Recent Activity</h3>
      </div>
      
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon" style={{ background: activity.color }}>
              {activity.icon}
            </div>
            
            <div className="activity-content">
              <p className="activity-text">{activity.text}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
            
            <div className="activity-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;