import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar"

type Props = {
    onClickNotification: () => void;
    onUploadCV: () => void;
    onLogout: () => void;
    onViewProfile: () => void;
    onViewInternship: () => void;
    onViewDashboard: () => void;
};

export default function UploadCVScreen({
    onClickNotification,
    onUploadCV,
    onLogout,
    onViewDashboard,
    onViewInternship,
    onViewProfile,
}: Props) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            {/* HEADER */}
            <AppHeader
                title="ISRS – Upload CV"
                onClickNotification={onClickNotification}
                onLogout={onLogout}
                notificationCount={unreadCount}
            />

            {/* TAB BAR */}
            <StudentTabBar
                active="upload-cv"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
            />

            {/* NỘI DUNG */}
            <div className="max-w-5xl mx-auto p-8 space-y-8">
                {/* CURRENT CV */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="font-bold text-lg">
                                my_resume_2024.pdf
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                Uploaded on Jan 5, 2026 • 245 KB • Parsed Successfully
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 border rounded-lg text-sm">
                                View
                            </button>
                            <button className="px-4 py-2 border rounded-lg text-sm text-red-600">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* UPLOAD BOX */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="border-2 border-dashed rounded-xl p-12 text-center bg-gray-50">
                        <div className="text-5xl mb-4">📄</div>
                        <div className="font-bold text-lg">
                            Drag and drop your CV here
                        </div>
                        <div className="text-sm text-gray-500 my-2">or</div>
                        <button className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold">
                            Browse files
                        </button>
                        <div className="text-xs text-gray-500 mt-4">
                            PDF, DOC, DOCX (max 5MB)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
