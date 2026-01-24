import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

export default function SystemReportScreen({
    onViewDashboard,
    onViewCVParsing,
    onViewUserManagement,
    onViewSystemReport,
    onClickNotification,
    onLogout,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50">
            <AppHeader
                title="ISRS – System Report"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="admin-system-report"
                onViewDashboard={onViewDashboard}
                onViewCVParsing={onViewCVParsing}
                onViewUserManagement={onViewUserManagement}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-5xl mx-auto p-8 bg-white border mt-6">
                <h2 className="text-xl font-semibold mb-4">
                    System Health Overview
                </h2>

                <p className="text-gray-600">
                    Logs, performance metrics, errors, uptime, traffic…
                </p>
            </div>
        </div>
    );
}
