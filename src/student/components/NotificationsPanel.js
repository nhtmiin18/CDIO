import React from 'react';
import './NotificationsPanel.css';
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const NotificationsPanel = () => {
  const notifications = [
    {
      type: 'match',
      icon: <FaBell />,
      title: 'New Match!',
      message: 'You have a 92% match with Frontend Developer position',
      time: '2 hours ago',
      color: '#27ae60'
    },
    {
      type: 'warning',
      icon: <FaExclamationTriangle />,
      title: 'Profile Incomplete',
      message: 'Complete your profile to get better matches',
      time: '1 day ago',
      color: '#e67e22'
    },
    {
      type: 'info',
      icon: <FaInfoCircle />,
      title: 'CV Parsed',
      message: 'Your CV has been successfully parsed',
      time: '2 days ago',
      color: '#3498db'
    },
  ];

  return (
    <div className="notifications-card">
      <div className="card-header">
        <h3>Recent Notifications (3)</h3>
        <button className="view-all-btn">
          VIEW ALL
        </button>
      </div>
      
      <div className="notifications-list">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <div 
              className="notification-icon"
              style={{ background: notification.color }}
            >
              {notification.icon}
            </div>
            
            <div className="notification-content">
              <div className="notification-header">
                <h4>{notification.title}</h4>
                <span className="notification-time">{notification.time}</span>
              </div>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPanel;