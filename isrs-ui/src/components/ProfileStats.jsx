const ProfileStats = () => {
    const stats = [
        { label: "Profile Completion", value: "75%" },
        { label: "Total Matches", value: "12" },
        { label: "Profile Views", value: "48" },
        { label: "Avg Match Score", value: "84%" },
    ];

    return (
        <div className="profile-stats">
            <h3>Profile Statistics</h3>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <div className="stat-value">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileStats;
