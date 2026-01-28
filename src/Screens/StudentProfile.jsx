import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar";

export default function CVParsingScreen({
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onViewCVParsing,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – Student Profile"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="profile"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewCVParsing={onViewCVParsing}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-7xl mx-auto p-8">

                <div className="bg-white rounded-2xl border shadow-sm p-6">

                    <h2 className="font-semibold mb-4">Student Profile</h2>

                    <p>Email: student@email.com</p>
                    <p>University: Duy Tan University</p>
                    <p>Major: Software Engineering</p>

                </div>

            </div>
        </div>
    );
}
