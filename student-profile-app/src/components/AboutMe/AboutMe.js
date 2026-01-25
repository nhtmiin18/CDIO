import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-me">
      <h3>About Me</h3>
      <textarea 
        placeholder="Brief description about yourself..."
        rows="6"
        defaultValue=""
      />
      <div className="char-count">0/500 characters</div>
    </div>
  );
};

export default AboutMe;