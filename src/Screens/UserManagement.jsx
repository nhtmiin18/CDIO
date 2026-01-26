import { useEffect, useState } from "react";
import axios from "axios";
import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";

export default function UserManagementScreen(props) {
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
        if (!confirm("Delete user?")) return;
        await axios.delete(`${API}/users/${id}`);
        loadUsers();
    };

    const filtered = users.filter(u =>
        (u.name || "").toLowerCase().includes(search.toLowerCase()) &&
        (role === "all" || u.role === role)
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <AppHeader
                title="ISRS – User Management"
                onClickNotification={props.onClickNotification}
                notificationCount={unreadCount}
                onLogout={props.onLogout}
            />

            <AdminTabBar
                active="user-management"
                onViewDashboard={props.onViewDashboard}
                onViewCVParsing={props.onViewCVParsing}
                onViewUserManagement={props.onViewUserManagement}
                onViewSystemReport={props.onViewSystemReport}
            />

            <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl">

                {/* SEARCH + FILTER */}
                <div className="flex gap-4 mb-4">
                    <input
                        className="border p-2 rounded w-64"
                        placeholder="Search name..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    <select
                        className="border p-2 rounded"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="student">Student</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>

                <table className="w-full text-sm table-fixed">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left p-2 w-1/3">Name</th>
                            <th className="text-left p-2 w-32">Role</th>
                            <th className="text-left p-2 w-32">Status</th>
                            <th className="text-center p-2 w-40">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map(u => (
                            <tr key={u._id} className="border-t">

                                <td className="p-2">{u.name}</td>

                                <td className="p-2">{u.role}</td>

                                <td className="p-2">
                                    <span
                                        className={`inline-block min-w-[70px] text-center px-3 py-1 rounded text-xs ${u.status === "blocked"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {u.status}
                                    </span>
                                </td>

                                <td className="p-2">
                                    <div className="flex gap-3 items-center justify-center">

                                        <button
                                            onClick={() => toggleBlock(u._id)}
                                            className="w-[80px] px-3 py-1 border rounded text-center"
                                        >
                                            {u.status === "blocked" ? "Unblock" : "Block"}
                                        </button>

                                        <button
                                            onClick={() => deleteUser(u._id)}
                                            className="px-3 py-1 border rounded text-red-500"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
