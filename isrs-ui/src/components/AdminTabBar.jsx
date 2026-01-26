export default function AdminTabBar({
    active,
    onViewDashboard,
    onViewCVParsing,
    onViewUserManagement,
    onViewSystemReport,
}) {
    const item = (key, label, onClick) => (
        <div
            onClick={onClick}
            className={`px-6 py-4 text-sm font-semibold cursor-pointer
                ${active === key
                    ? "border-b-2 border-slate-800 text-slate-900"
                    : "text-gray-500 hover:text-slate-800"
                }`}
        >
            {label}
        </div>
    );

    return (
        <div className="bg-white border-b flex px-8">
            {item("admin-dashboard", "Dashboard", onViewDashboard)}
            {item("cv-parsing", "CV Parsing", onViewCVParsing)}
            {item("user-management", "Users", onViewUserManagement)}
            {item("system-report", "Reports", onViewSystemReport)}
        </div>
    );
}
