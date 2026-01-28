export default function AdminTabBar({
    active,
    onViewDashboard,
    onViewUserManagement,
    onViewInternshipPosts,
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
            {item("admin-user-management", "Users", onViewUserManagement)}
            {item("admin-internship-posts", "Internship Posts", onViewInternshipPosts)}
            {item("admin-system-report", "Reports", onViewSystemReport)}
        </div>
    );
}
