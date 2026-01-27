import React from 'react';
import './ProfileVisibility.css';

const ProfileVisibility = () => {
  return (
    <div className="profile-visibility">
      <h3>Profile Visibility</h3>
      <div className="visibility-content">
        <p>Control who can see your profile</p>
        <div className="visibility-options">
          <div className="visibility-item">
            <input type="checkbox" id="visible-to-all" defaultChecked />
            <label htmlFor="visible-to-all">Visible to recruiters</label>
          </div>
          <div className="visibility-item">
            <input type="checkbox" id="allow-messages" defaultChecked />
            <label htmlFor="allow-messages">Allow direct messages</label>
          </div>
          <div className="visibility-item">
            <input type="checkbox" id="show-in-search" defaultChecked />
            <label htmlFor="show-in-search">Show in search results</label>
          </div>
        </div>
        
        <div className="skills-section">
          <h4>Skills</h4>
          <div className="skills-tags">
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">React</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag add-skill">+ Add Skill</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileVisibility;