import React from 'react';
import './ProfilePhoto.css';

const ProfilePhoto = () => {
  const handlePhotoUpload = (e) => {
    // Handle photo upload logic here
    console.log('Photo uploaded:', e.target.files[0]);
  };

  return (
    <div className="profile-photo-section">
      <div className="photo-container">
        <div className="photo-placeholder">
          <div className="photo-initials">JS</div>
          <input 
            type="file" 
            id="photo-upload" 
            accept="image/*" 
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="photo-upload" className="upload-overlay">
            <span className="upload-icon">📷</span>
            <span className="upload-text">UPLOAD PHOTO</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;