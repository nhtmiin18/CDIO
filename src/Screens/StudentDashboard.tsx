import ProfileStatus from "../components/ProfileStatus";
import InternshipMatches from "../components/InternshipMatches";
import RecentActivity from "../components/RecentActivity";
import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar"

export default function StudentDashboard({
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onClickNotification,
    onLogout,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <AppHeader
                title="ISRS – Student Dashboard"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="student-dashboard"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
            />



            {/* WELCOME */}
            <div className="border p-4 mb-6 bg-white">
                <h1 className="text-xl font-semibold">
                    Welcome, Student 👋
                </h1>
                <p className="text-gray-500">
                    Your personalized internship dashboard
                </p>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ProfileStatus />
                <InternshipMatches />
            </div>

            {/* ACTIVITY */}
            <RecentActivity />
        </div>
    );
}
