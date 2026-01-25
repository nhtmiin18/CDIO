import React from 'react';
import './ActionButtons.css';

const ActionButtons = () => {
  const handleCancel = () => {
    console.log('Cancelling changes...');
    // Add cancel logic here
  };

  const handleSave = () => {
    console.log('Saving changes...');
    // Add save logic here
  };

  return (
    <div className="action-buttons">
      <button className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default ActionButtons;