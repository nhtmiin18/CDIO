export default function StudentTabBar({
    active,
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewCVParsing,
    onViewInternship,
}) {
    const tabClass = (key) =>
        `px-4 py-3 cursor-pointer text-sm font-medium border-b-2 transition ${active === key
            ? "border-slate-900 text-slate-900"
            : "border-transparent text-gray-500 hover:text-slate-800"
        }`;

    return (
        <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto flex gap-6 px-8">

                <div
                    className={tabClass("student-dashboard")}
                    onClick={onViewDashboard}
                >
                    Dashboard
                </div>

                <div
                    className={tabClass("profile")}
                    onClick={onViewProfile}
                >
                    Profile
                </div>

                <div
                    className={tabClass("upload-cv")}
                    onClick={onUploadCV}
                >
                    Upload CV
                </div>

                <div
                    className={tabClass("student-cv-parsing")}
                    onClick={onViewCVParsing}
                >
                    CV Result
                </div>

                <div
                    className={tabClass("internships")}
                    onClick={onViewInternship}
                >
                    Internships
                </div>

            </div>
        </div>
    );
}
