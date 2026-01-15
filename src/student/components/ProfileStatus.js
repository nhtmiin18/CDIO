import React from 'react';
import './ProfileStatus.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ProfileStatus = () => {
  const profileItems = [
    { label: 'Basic information completed', completed: true },
    { label: 'CV uploaded and parsed', completed: true },
    { label: 'Skills verification pending', completed: false },
    { label: 'Add portfolio projects', completed: false },
  ];

  return (
    <div className="profile-status-card">
      <div className="card-header">
        <h3>Profile Status</h3>
        <div className="completion-rate">
          <div className="progress-circle">
            <span className="progress-text">75%</span>
          </div>
          <span className="progress-label">Profile Completion</span>
        </div>
      </div>
      
      <div className="profile-checklist">
        {profileItems.map((item, index) => (
          <div key={index} className="checklist-item">
            <div className="check-icon">
              {item.completed ? (
                <FaCheck className="completed" />
              ) : (
                <FaTimes className="pending" />
              )}
            </div>
            <span className={`check-label ${item.completed ? 'completed' : 'pending'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      
      <button className="complete-profile-btn">
        COMPLETE PROFILE
      </button>
    </div>
  );
};

export default ProfileStatus;