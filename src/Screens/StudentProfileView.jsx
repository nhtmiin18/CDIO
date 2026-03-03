import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";

export default function StudentProfileView({
    student,
    onBack,
    onClickNotification,
    onLogout,
}) {
    if (!student) return null;

    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">

            <AppHeader
                title="Student Profile"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                showBack={true}
                onBack={onBack}
                onLogout={onLogout}
            />

            <div className="max-w-5xl mx-auto p-8">

                {/* PROFILE CARD */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">

                    <h2 className="text-2xl font-semibold mb-1">
                        {student.name}
                    </h2>

                    <p className="text-gray-500 mb-6">
                        {student.major}
                    </p>

                    {/* SKILLS */}
                    <div className="mb-6">
                        <div className="font-semibold mb-2">Skills</div>

                        <div className="flex flex-wrap gap-2">
                            {student.skills.map(s => (
                                <span
                                    key={s}
                                    className="px-3 py-1 bg-slate-100 rounded-full text-sm"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div className="mb-4">
                        <div className="font-semibold mb-1">
                            Experience
                        </div>
                        <div className="text-gray-600">
                            {student.experience}
                        </div>
                    </div>

                    {/* CERTIFICATES */}
                    <div>
                        <div className="font-semibold mb-1">
                            Certificates
                        </div>
                        <div className="text-gray-600">
                            {student.certificates}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
