export default function StudentTabBar({
    active,
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
}) {
    const tabClass = (name) =>
        `px-6 py-4 text-sm ${active === name
            ? "font-semibold border-b-2 border-slate-800 text-slate-900"
            : "text-gray-500 hover:text-slate-800"
        }`;

    return (
        <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-8 flex">
                <button className={tabClass("dashboard")} onClick={onViewDashboard}>
                    Dashboard
                </button>

                <button className={tabClass("profile")} onClick={onViewProfile}>
                    Profile
                </button>

                <button className={tabClass("upload-cv")} onClick={onUploadCV}>
                    Upload CV
                </button>

                <button className={tabClass("internships")} onClick={onViewInternship}>
                    Internships
                </button>
            </div>
        </div>
    );
}
