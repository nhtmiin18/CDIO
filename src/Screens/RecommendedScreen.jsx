import { studentsData } from "../data/studentsData";
import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

function RecommendedScreen({
    onSelectStudent,
    onLogout,
    onViewDashboard,
    onCreatePost,
    onViewRecommended,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <AppHeader
                title="ISRS – Recommended Students"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <RecruiterTabBar
                active="recommended"
                onViewDashboard={onViewDashboard}
                onCreatePost={onCreatePost}
                onViewRecommended={onViewRecommended}
            />

            {/* CONTENT */}
            <div className="p-8">
                <h2 className="text-xl font-semibold mb-6">
                    Matched Students
                </h2>

                {studentsData.map((student) => (
                    <div
                        key={student.id}
                        className="border p-4 mb-3 cursor-pointer"
                        onClick={() => onSelectStudent(student)}
                    >
                        <h3 className="font-semibold">
                            {student.name}
                        </h3>
                        <p>{student.major}</p>
                        <p>Match score: {student.matchScore}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedScreen;
