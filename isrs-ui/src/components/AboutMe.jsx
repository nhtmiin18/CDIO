const AboutMe = () => {
    return (
        <div className="about-me">
            <h3>About Me</h3>

            <textarea
                rows="6"
                placeholder="Brief description about yourself..."
                defaultValue=""
            />

            <div className="char-count">0 / 500 characters</div>
        </div>
    );
};

export default AboutMe;
