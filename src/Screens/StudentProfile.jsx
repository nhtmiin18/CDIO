import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar";

export default function StudentProfile({
    onUploadCV,
    onViewProfile,
    onViewDashboard,
    onViewInternship,
    onClickNotification,
    onLogout,
}) {
    const unreadCount = getUnreadCount();

    const handleCancel = () => {
        console.log("Cancel profile changes");
    };

    const handleSave = () => {
        console.log("Save profile changes");
    };

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            {/* HEADER */}
            <AppHeader
                title="ISRS – Student Profile"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <StudentTabBar
                active="profile"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
            />

            {/* ===== CONTENT WRAPPER (QUAN TRỌNG) ===== */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto p-8">
                    <div className="grid grid-cols-12 gap-8">
                        {/* LEFT COLUMN */}
                        <div className="col-span-12 md:col-span-4 space-y-6">
                            <div className="bg-white border p-6 text-center">
                                <div className="w-40 h-40 mx-auto border flex items-center justify-center mb-4">
                                    [PROFILE PHOTO]
                                </div>

                                <div className="font-semibold">Student Name</div>
                                <div className="text-sm text-gray-500 mb-4">
                                    student@email.com
                                </div>

                                <hr className="my-4" />

                                <div className="text-left text-sm mb-2">
                                    Profile Completion
                                </div>
                                <div className="w-full h-3 border">
                                    <div className="h-full bg-black w-[85%]" />
                                </div>
                                <div className="text-sm mt-1">85%</div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="col-span-12 md:col-span-8 space-y-6">
                            <div className="bg-white border p-6">
                                <div className="font-semibold mb-4">
                                    Account Settings
                                </div>

                                <hr className="mb-6" />

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-sm">Email</label>
                                        <input
                                            className="border px-3 py-2 w-full mt-1"
                                            value="student@email.com"
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm">Password</label>
                                        <input
                                            className="border px-3 py-2 w-full mt-1"
                                            value="********"
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm">Phone</label>
                                        <input
                                            className="border px-3 py-2 w-full mt-1"
                                            value="+1 234 567 8900"
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm">University</label>
                                        <input
                                            className="border px-3 py-2 w-full mt-1"
                                            value="Duy Tan University"
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm">Major</label>
                                        <input
                                            className="border px-3 py-2 w-full mt-1"
                                            value="Software Engineering"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        onClick={handleCancel}
                                        className="px-6 py-2 border text-sm hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-6 py-2 bg-black text-white text-sm hover:bg-gray-800"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
