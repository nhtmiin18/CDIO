import React from 'react';
import './InternshipMatches.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const InternshipMatches = () => {
  const internships = [
    {
      title: 'Software Developer Intern',
      company: 'Company 1',
      type: 'Full-time',
      duration: '6 months',
      location: 'Remote',
      match: 85,
    },
    {
      title: 'Software Developer Intern',
      company: 'Company 2',
      type: 'Full-time',
      duration: '6 months',
      location: 'Remote',
      match: 80,
    },
    {
      title: 'Software Developer Intern',
      company: 'Company 3',
      type: 'Full-time',
      duration: '6 months',
      location: 'Remote',
      match: 75,
    },
  ];

  return (
    <div className="internship-card">
      <div className="card-header">
        <h3>Recent Internship Matches</h3>
        <button className="view-all-btn">
          VIEW ALL MATCHES
        </button>
      </div>
      
      <div className="internship-list">
        {internships.map((internship, index) => (
          <div key={index} className="internship-item">
            <div className="internship-header">
              <h4>{internship.title}</h4>
              <span className="company">{internship.company}</span>
            </div>
            
            <div className="internship-details">
              <span className="detail-tag">{internship.type}</span>
              <span className="detail-tag">{internship.duration}</span>
              <span className="detail-tag">{internship.location}</span>
            </div>
            
            <div className="internship-footer">
              <div className="match-score">
                <div className="match-bar">
                  <div 
                    className="match-fill" 
                    style={{ width: `${internship.match}%` }}
                  />
                </div>
                <span className="match-percent">{internship.match}% Match</span>
              </div>
              
              <button className="view-btn">
                <FaExternalLinkAlt />
                VIEW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipMatches;