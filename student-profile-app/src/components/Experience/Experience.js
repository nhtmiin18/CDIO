import React, { useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'Tech Company XYZ',
      period: 'June 2020 - Aug 2023',
      description: 'Developed responsive web applications and collaborated with deep learning team',
      isEditing: false
    }
  ]);

  const [newExp, setNewExp] = useState({
    title: '',
    company: '',
    period: '',
    description: ''
  });

  const handleAdd = () => {
    if (newExp.title && newExp.company && newExp.period) {
      const newExperience = {
        id: Date.now(),
        ...newExp,
        isEditing: false
      };
      setExperiences([...experiences, newExperience]);
      setNewExp({ title: '', company: '', period: '', description: '' });
    }
  };

  const handleDelete = (id) => {
    setExperiences(exps => exps.filter(exp => exp.id !== id));
  };

  return (
    <div className="experience-section">
      <h3>Experience</h3>
      
      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="experience-content">
              <h4>{exp.title}</h4>
              <p className="company-period">{exp.company} - {exp.period}</p>
              <p className="experience-description">{exp.description}</p>
            </div>
            <button className="delete-exp-btn" onClick={() => handleDelete(exp.id)}>
              Delete
            </button>
          </div>
        ))}
        
        <div className="add-experience-form">
          <div className="form-row">
            <input
              type="text"
              value={newExp.title}
              onChange={(e) => setNewExp({...newExp, title: e.target.value})}
              placeholder="Job Title"
              className="exp-input"
            />
            <input
              type="text"
              value={newExp.company}
              onChange={(e) => setNewExp({...newExp, company: e.target.value})}
              placeholder="Company"
              className="exp-input"
            />
          </div>
          
          <div className="form-row">
            <input
              type="text"
              value={newExp.period}
              onChange={(e) => setNewExp({...newExp, period: e.target.value})}
              placeholder="Period (e.g., June 2020 - Aug 2023)"
              className="exp-input"
            />
          </div>
          
          <textarea
            value={newExp.description}
            onChange={(e) => setNewExp({...newExp, description: e.target.value})}
            placeholder="Description of responsibilities and achievements"
            className="exp-textarea"
            rows="3"
          />
          
          <button onClick={handleAdd} className="add-exp-btn">
            + Add Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;