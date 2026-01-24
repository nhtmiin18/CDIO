import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

function StudentProfileView({
    student,
    onBack,
    onViewDashboard,
    onCreatePost,
    onViewRecommended,
    onClickNotification,
    onLogout,
}) {
    if (!student) return null;
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <AppHeader
                title="Student Profile"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <RecruiterTabBar
                active="student-profile-view"
                onViewDashboard={onViewDashboard}
                onCreatePost={onCreatePost}
                onViewRecommended={onViewRecommended}
            />

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto p-6">
                {/* BACK */}
                <button
                    onClick={onBack}
                    className="mb-4 text-blue-600 hover:underline"
                >
                    ← Back to matches
                </button>

                {/* CARD */}
                <div className="bg-white border rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-1">
                        {student.name}
                    </h2>
                    <p className="text-gray-500 mb-4">
                        {student.major}
                    </p>

                    <div className="mb-4">
                        <h4 className="font-semibold mb-2">Skills</h4>
                        <ul className="list-disc pl-6">
                            {student.skills.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </div>

                    <p className="mb-2">
                        <b>Experience:</b> {student.experience}
                    </p>

                    <p>
                        <b>Certificates:</b> {student.certificates}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StudentProfileView;
