import React, { useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [languages, setLanguages] = useState(['JavaScript', 'Python', 'Java', 'C++', 'TypeScript']);
  const [frameworks, setFrameworks] = useState(['React', 'Angular', 'Spring']);
  const [newSkill, setNewSkill] = useState('');
  const [skillType, setSkillType] = useState('language');

  const addSkill = () => {
    if (newSkill.trim()) {
      if (skillType === 'language') {
        setLanguages([...languages, newSkill.trim()]);
      } else {
        setFrameworks([...frameworks, newSkill.trim()]);
      }
      setNewSkill('');
    }
  };

  const removeSkill = (index, type) => {
    if (type === 'language') {
      const updated = [...languages];
      updated.splice(index, 1);
      setLanguages(updated);
    } else {
      const updated = [...frameworks];
      updated.splice(index, 1);
      setFrameworks(updated);
    }
  };

  return (
    <div className="skills-section">
      <h3>Skills</h3>
      
      <div className="skills-container">
        <div className="skill-category">
          <h4>Programming Languages</h4>
          <div className="skills-list">
            {languages.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill}</span>
                <button 
                  className="remove-skill"
                  onClick={() => removeSkill(index, 'language')}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="skill-category">
          <h4>Frameworks & Libraries</h4>
          <div className="skills-list">
            {frameworks.map((skill, index) => (
              <div key={index} className="skill-item">
                <span className="skill-name">{skill}</span>
                <button 
                  className="remove-skill"
                  onClick={() => removeSkill(index, 'framework')}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="add-skill-form">
          <select 
            value={skillType}
            onChange={(e) => setSkillType(e.target.value)}
            className="skill-type-select"
          >
            <option value="language">Programming Language</option>
            <option value="framework">Framework/Library</option>
          </select>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter new skill"
            className="skill-input"
          />
          <button onClick={addSkill} className="add-skill-btn">
            + Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;