type Props = {
    title: string;

    // core
    onLogout: () => void;

    // back
    showBack?: boolean;
    onBack?: () => void;

    // notification
    onClickNotification?: () => void;
    notificationCount?: number;

    // navigation buttons (CÁCH 2)
    onViewProfile?: () => void;
    onUploadCV?: () => void;
    onViewInternship?: () => void;
};

export function AppHeader({
    title,
    onLogout,

    showBack = false,
    onBack,

    onClickNotification,
    notificationCount = 0,

    onViewProfile,
    onUploadCV,
    onViewInternship,
}: Props) {
    return (
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
            {/* LEFT */}
            <div className="flex items-center gap-4">
                {showBack && onBack && (
                    <button
                        className="font-bold text-slate-700 hover:text-black"
                        onClick={onBack}
                    >
                        ← Back
                    </button>
                )}

                <div className="w-10 h-10 bg-slate-800 text-white flex items-center justify-center rounded font-bold">
                    IS
                </div>

                <span className="font-bold text-lg">{title}</span>
            </div>

            {/* CENTER NAV (optional) */}
            <div className="flex items-center gap-4">
                {onViewProfile && (
                    <button
                        onClick={onViewProfile}
                        className="px-3 py-1 rounded hover:bg-gray-100 text-sm"
                    >
                        Profile
                    </button>
                )}

                {onUploadCV && (
                    <button
                        onClick={onUploadCV}
                        className="px-3 py-1 rounded hover:bg-gray-100 text-sm"
                    >
                        Upload CV
                    </button>
                )}

                {onViewInternship && (
                    <button
                        onClick={onViewInternship}
                        className="px-3 py-1 rounded hover:bg-gray-100 text-sm"
                    >
                        Internships
                    </button>
                )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
                {onClickNotification && (
                    <button
                        className="relative text-xl"
                        onClick={onClickNotification}
                    >
                        🔔
                        {notificationCount > 0 && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white rounded-full text-xs font-bold">
                                {notificationCount}
                            </span>
                        )}
                    </button>
                )}

                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-slate-300 rounded-full" />
                    <span className="font-medium">John Doe</span>
                </div>

                <button
                    className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
} export default AppHeader;

