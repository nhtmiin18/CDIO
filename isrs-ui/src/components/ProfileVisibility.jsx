const ProfileVisibility = () => {
    return (
        <div className="profile-visibility">
            <h3>Profile Visibility</h3>

            <div className="visibility-content">
                <p>Control who can see your profile</p>

                <div className="visibility-options">
                    <label className="visibility-item">
                        <input type="checkbox" defaultChecked />
                        Visible to recruiters
                    </label>

                    <label className="visibility-item">
                        <input type="checkbox" defaultChecked />
                        Allow direct messages
                    </label>

                    <label className="visibility-item">
                        <input type="checkbox" defaultChecked />
                        Show in search results
                    </label>
                </div>

                <div className="skills-section">
                    <h4>Skills</h4>
                    <div className="skills-tags">
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">Node.js</span>
                        <span className="skill-tag">Python</span>
                        <span className="skill-tag add-skill">+ Add Skill</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileVisibility;
