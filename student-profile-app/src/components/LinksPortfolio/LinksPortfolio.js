import React from 'react';
import './LinksPortfolio.css';

const LinksPortfolio = () => {
  return (
    <div className="links-portfolio-section">
      <h3>Links & Portfolio</h3>
      
      <div className="links-grid">
        <div className="input-group">
          <label>GitHub URL</label>
          <input type="url" placeholder="Enter github url" />
        </div>
        <div className="input-group">
          <label>LinkedIn URL</label>
          <input type="url" placeholder="Enter LinkedIn url" />
        </div>
        <div className="input-group">
          <label>Portfolio Website</label>
          <input type="url" placeholder="Enter portfolio website" />
        </div>
        <div className="input-group">
          <label>Other Links</label>
          <input type="url" placeholder="Enter other links" />
        </div>
      </div>
    </div>
  );
};

export default LinksPortfolio;