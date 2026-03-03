import ProfileStatus from "../components/ProfileStatus";
import InternshipMatches from "../components/InternshipMatches";
import RecentActivity from "../components/RecentActivity";
import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar";

type Props = {
    _id: string | null;

    onClickNotification: () => void;
    onUploadCV: () => void;
    onLogout: () => void;
    onViewProfile: () => void;
    onViewInternship: () => void;
    onViewCVParsing: () => void;
    onViewDashboard: () => void;
};

export default function StudentDashboard({
    _id,   // ✅ thêm dòng này

    onClickNotification,
    onUploadCV,
    onLogout,
    onViewDashboard,
    onViewInternship,
    onViewCVParsing,
    onViewProfile,
}: Props) {

    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">

            <AppHeader
                title="ISRS – Student Dashboard"
                user={JSON.parse(localStorage.getItem("user") || "null")}
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="student-dashboard"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewCVParsing={onViewCVParsing}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8">

                <div className="bg-white rounded-2xl border shadow-sm p-6">
                    <h1 className="text-xl font-semibold">
                        Welcome, Student 👋
                    </h1>
                    <p className="text-slate-500">
                        Your personalized internship dashboard
                    </p>

                    {_id && (
                        <p className="text-xs text-slate-400 mt-2">
                            User ID: {_id}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileStatus />
                    <InternshipMatches />
                </div>

                <RecentActivity />

            </div>
        </div>
    );
}