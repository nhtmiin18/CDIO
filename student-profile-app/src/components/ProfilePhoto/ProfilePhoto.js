<<<<<<< HEAD
import React, { useState } from 'react';
import './ProfilePhoto.css';

const ProfilePhoto = () => {
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Hiển thị preview ngay lập tức
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);

    // 2. Upload lên backend
    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      // QUAN TRỌNG: Đổi port nếu backend chạy port khác
      const response = await fetch('/api/students/1/avatar', {
        method: 'POST',
        body: formData
        // KHÔNG set headers: browser sẽ tự động set multipart/form-data
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      console.log('✅ Photo uploaded successfully:', data);
      
      // 3. Cập nhật ảnh từ backend (nếu backend trả về URL)
      if (data.filePath) {
        // Nếu backend lưu ảnh và trả về đường dẫn
        // setPhoto(`http://localhost:5000/${data.filePath}`);
      }

    } catch (err) {
      console.error('❌ Upload error:', err);
      //setError(err.message);
      // Giữ preview nhưng thông báo lỗi
      setError('');
    } finally {
      setUploading(false);
    }
=======
import React from 'react';
import './ProfilePhoto.css';

const ProfilePhoto = () => {
  const handlePhotoUpload = (e) => {
    // Handle photo upload logic here
    console.log('Photo uploaded:', e.target.files[0]);
>>>>>>> c79facef3a518b82aa232b95d9689081f51838c7
  };

  return (
    <div className="profile-photo-section">
      <div className="photo-container">
        <div className="photo-placeholder">
<<<<<<< HEAD
          {photo ? (
            // Hiển thị ảnh đã chọn
            <img 
              src={photo} 
              alt="Profile" 
              className="profile-image"
            />
          ) : (
            // Hiển thị placeholder khi chưa có ảnh
            <div className="photo-initials">JS</div>
          )}
          
=======
          <div className="photo-initials">JS</div>
>>>>>>> c79facef3a518b82aa232b95d9689081f51838c7
          <input 
            type="file" 
            id="photo-upload" 
            accept="image/*" 
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
<<<<<<< HEAD
            disabled={uploading}
          />
          
          <label htmlFor="photo-upload" className="upload-overlay">
            {uploading ? (
              <div className="uploading-indicator">
                <span className="spinner"></span>
                <span>Uploading...</span>
              </div>
            ) : (
              <>
                <span className="upload-icon">📷</span>
                <span className="upload-text">UPLOAD PHOTO</span>
              </>
            )}
          </label>
        </div>
      </div>
      
      {/* Hiển thị lỗi nếu có */}
      {error && (
        <div className="upload-error">
          ❌ {error}
        </div>
      )}
      
      {/* Hiển thị trạng thái */}
      {uploading && (
        <div className="upload-status">
          ⏳ Đang tải lên...
        </div>
      )}
=======
          />
          <label htmlFor="photo-upload" className="upload-overlay">
            <span className="upload-icon">📷</span>
            <span className="upload-text">UPLOAD PHOTO</span>
          </label>
        </div>
      </div>
>>>>>>> c79facef3a518b82aa232b95d9689081f51838c7
    </div>
  );
};

export default ProfilePhoto;