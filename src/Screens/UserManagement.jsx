import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

export default function UserManagementScreen({
    onViewDashboard,
    onViewCVParsing,
    onViewUserManagement,
    onViewSystemReport,
    onClickNotification,
    onLogout,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            <AppHeader
                title="ISRS � User Management"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="user-management"
                onViewDashboard={onViewDashboard}
                onViewCVParsing={onViewCVParsing}
                onViewUserManagement={onViewUserManagement}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-5xl mx-auto p-8">
                <div className="bg-white border rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Users
                    </h2>

                    <table className="w-full text-sm">
                        <thead className="border-b">
                            <tr>
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Role</th>
                                <th className="text-left p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2">Nguyen Van A</td>
                                <td className="p-2">Student</td>
                                <td className="p-2">Active</td>
                            </tr>
                            <tr>
                                <td className="p-2">Tran Thi B</td>
                                <td className="p-2">Recruiter</td>
                                <td className="p-2">Blocked</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
