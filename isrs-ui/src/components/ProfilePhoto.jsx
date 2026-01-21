const ProfilePhoto = () => {
    const handlePhotoUpload = (e) => {
        console.log("Photo uploaded:", e.target.files[0]);
    };

    return (
        <div className="profile-photo-section">
            <div className="photo-container">
                <div className="photo-placeholder">
                    <div className="photo-initials">JS</div>

                    <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        hidden
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
