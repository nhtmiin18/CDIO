import { AppHeader } from "./AppHeader";

export default function PageLayout({
    title,
    notificationCount,
    onClickNotification,
    onLogout,
    children,
}) {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">

            {/* HEADER */}
            <AppHeader
                title={title}
                notificationCount={notificationCount}
                onClickNotification={onClickNotification}
                onLogout={onLogout}
            />

            {/* PAGE CONTENT */}
            <div className="max-w-7xl mx-auto p-8">
                {children}
            </div>

        </div>
    );
}
