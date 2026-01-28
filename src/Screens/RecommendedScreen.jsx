import { studentsData } from "../data/studentsData";
import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

function RecommendedScreen({
    onSelectStudent,
    onViewDashboard,
    onViewRecommended,
    onViewPosts,
    onLogout,
    onClickNotification,
}) {

    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100">
            <AppHeader
                title="ISRS – Recommended Students"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <RecruiterTabBar
                active="recommended"
                onViewDashboard={onViewDashboard}
                onViewRecommended={onViewRecommended}
                onViewPosts={onViewPosts}
            />

            <div className="max-w-6xl mx-auto p-8">

                <h2 className="text-xl font-semibold mb-6">
                    Matched Students
                </h2>

                {studentsData.map((student) => (
                    <div
                        key={student.id}
                        className="bg-white rounded-2xl border shadow-sm p-4 mb-3 cursor-pointer hover:bg-slate-50"
                        onClick={() => onSelectStudent(student)}
                    >
                        <h3 className="font-semibold">
                            {student.name}
                        </h3>
                        <p>{student.major}</p>
                        <p className="text-sm text-gray-500">
                            Match score: {student.matchScore}%
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendedScreen;
