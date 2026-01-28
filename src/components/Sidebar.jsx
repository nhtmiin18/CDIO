const Sidebar = () => {
    const menuItems = [
        { id: 1, name: "Dashboard", icon: "📊" },
        { id: 2, name: "Profile", icon: "👤", active: true },
        { id: 3, name: "Upload CV", icon: "📄" },
        { id: 4, name: "Internships", icon: "💼" },
        { id: 5, name: "Notifications", icon: "🔔" },
    ];

    return (
        <aside>
            <h1>ISRS</h1>
            <h2>My Profile</h2>

            <nav>
                {menuItems.map((item) => (
                    <div key={item.id}>
                        {item.icon} {item.name}
                    </div>
                ))}
            </nav>

            <p>© 2024 ISRS</p>
        </aside>
    );
};

export default Sidebar;
