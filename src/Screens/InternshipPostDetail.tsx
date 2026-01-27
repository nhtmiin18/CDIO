import { AppHeader } from "../components/AppHeader";
import StudentTabBar from "../components/StudentTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

type Props = {
    onLogout: () => void;
    onClickNotification: () => void;
    onViewDashboard: () => void;
    onViewProfile: () => void;
    onUploadCV: () => void;
    onViewInternship: () => void;
    onViewCVParsing: () => void;
};

export default function InternshipPostDetail({
    onLogout,
    onClickNotification,
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onViewCVParsing,
}: Props) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">

            {/* HEADER */}
            <AppHeader
                title="ISRS – Internship Detail"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <StudentTabBar
                active="internships"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
                onViewCVParsing={onViewCVParsing}
            />

            {/* CONTENT */}
            <div className="max-w-5xl mx-auto p-8">
                <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">

                    <h2 className="text-xl font-semibold">
                        Frontend Developer Intern
                    </h2>

                    <p className="text-gray-600">
                        Tech Corporation Inc.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><strong>Location:</strong> Remote</p>
                        <p><strong>Duration:</strong> 6 months</p>
                        <p><strong>Stipend:</strong> $2000 / month</p>
                    </div>

                </div>
            </div>

        </div>
    );
}
