import React from 'react';
import './BasicInfo.css';

const BasicInfo = () => {
  return (
    <div className="basic-info">
      <h3>Basic Information</h3>
      
      <div className="info-grid">
        <div className="input-row">
          <div className="input-group">
            <label>First Name</label>
            <input type="text" placeholder="Enter first name" />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" placeholder="Enter last name" />
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter phone number" />
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-group full-width">
            <label>University</label>
            <input type="text" placeholder="Enter university" />
          </div>
        </div>
        
        <div className="input-row">
          <div className="input-group">
            <label>Year of Study</label>
            <select defaultValue="">
              <option value="" disabled>Enter year of study</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
              <option>Graduated</option>
            </select>
          </div>
          <div className="input-group">
            <label>Expected Graduation</label>
            <input type="text" placeholder="Enter expected graduation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;