const LinksPortfolio = () => {
    return (
        <div className="links-portfolio-section">
            <h3>Links & Portfolio</h3>

            <div className="links-grid">
                <div className="input-group">
                    <label htmlFor="github">GitHub URL</label>
                    <input
                        id="github"
                        type="url"
                        placeholder="Enter GitHub URL"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="linkedin">LinkedIn URL</label>
                    <input
                        id="linkedin"
                        type="url"
                        placeholder="Enter LinkedIn URL"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="portfolio">Portfolio Website</label>
                    <input
                        id="portfolio"
                        type="url"
                        placeholder="Enter portfolio website"
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="other">Other Links</label>
                    <input
                        id="other"
                        type="url"
                        placeholder="Enter other links"
                    />
                </div>
            </div>
        </div>
    );
};

export default LinksPortfolio;
