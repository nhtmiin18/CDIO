import { useEffect, useState } from "react";
import axios from "axios";
import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";

export default function UserManagementScreen({
    onViewDashboard,
    onViewUserManagement,
    onViewInternshipPosts,
    onViewSystemReport,
    onClickNotification,
    onLogout,
}) {

    const unreadCount = getUnreadCount();

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("all");

    const loadUsers = async () => {
        const res = await axios.get(`${API}/users`);
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const toggleBlock = async id => {
        await axios.put(`${API}/users/${id}/block`);
        loadUsers();
    };

    const deleteUser = async id => {
        if (!window.confirm("Delete user?")) return;
        await axios.delete(`${API}/users/${id}`);
        loadUsers();
    };

    const filtered = users.filter(u =>
        (u.name || "").toLowerCase().includes(search.toLowerCase()) &&
        (role === "all" || u.role === role)
    );

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – User Management"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="admin-user-management"
                onViewDashboard={onViewDashboard}
                onViewUserManagement={onViewUserManagement}
                onViewInternshipPosts={onViewInternshipPosts}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-7xl mx-auto p-8">
                <div className="bg-white rounded-2xl shadow-sm border p-6">

                    {/* FILTER */}
                    <div className="flex gap-4 mb-6">
                        <input
                            className="border rounded-lg px-3 py-2 w-64"
                            placeholder="Search name..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        <select
                            className="border rounded-lg px-3 py-2"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="student">Student</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="text-left py-3">Name</th>
                                <th className="text-center">Role</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map(u => (
                                <tr key={u._id} className="border-b last:border-none hover:bg-slate-50">

                                    {/* NAME + COMPANY */}
                                    <td className="py-3">
                                        <div className="font-medium">
                                            {u.name}
                                        </div>

                                        {u.role === "recruiter" && u.companyName && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {u.companyName}
                                            </div>
                                        )}
                                    </td>

                                    <td className="text-center capitalize">
                                        {u.role}
                                    </td>

                                    <td className="text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${u.status === "blocked"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"}`}
                                        >
                                            {u.status}
                                        </span>
                                    </td>

                                    <td className="py-2">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => toggleBlock(u._id)}
                                                className="px-3 py-1 border rounded-lg hover:bg-slate-100"
                                            >
                                                {u.status === "blocked" ? "Unblock" : "Block"}
                                            </button>

                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="px-3 py-1 border rounded-lg text-red-500 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-400">
                                        No users found
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}