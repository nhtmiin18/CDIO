import { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";

export default function InternshipPostManagement({
    onViewDashboard,
    onViewUserManagement,
    onViewInternshipPosts,
    onViewSystemReport,
    onClickNotification,
    onLogout,
}) {
    const unreadCount = getUnreadCount();

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const res = await axios.get(`${API}/internship-posts`);
        setPosts(res.data);
    };

    const changeStatus = async (id, status) => {
        await axios.put(`${API}/internship-posts/${id}/status`, { status });
        loadPosts();
    };

    // ===== SEARCH + FILTER =====
    const filteredPosts = posts.filter(p => {
        const textMatch =
            `${p.title} ${p.companyName}`.toLowerCase().includes(search.toLowerCase());

        const statusMatch =
            statusFilter === "ALL" || p.status === statusFilter;

        return textMatch && statusMatch;
    });

    const stats = [
        { label: "Total", value: posts.length },
        { label: "Active", value: posts.filter(p => p.status === "PUBLISHED").length },
        { label: "Paused", value: posts.filter(p => p.status === "PAUSED").length },
        { label: "Expired", value: posts.filter(p => p.status === "EXPIRED").length },
        { label: "Draft", value: posts.filter(p => p.status === "DRAFT").length },
    ];

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – Internship Posts"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="admin-internship-posts"
                onViewDashboard={onViewDashboard}
                onViewUserManagement={onViewUserManagement}
                onViewInternshipPosts={onViewInternshipPosts}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8">

                {/* STATS */}
                <div className="grid grid-cols-5 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border text-center">
                            <div className="text-2xl font-bold">{s.value}</div>
                            <div className="text-sm text-gray-500">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* SEARCH + FILTER BAR */}
                <div className="bg-white border rounded-xl p-4 flex gap-4 items-center">

                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search title or company..."
                            className="pl-9 border rounded-lg w-full py-2 text-sm"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="ALL">All Status</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="PAUSED">Paused</option>
                        <option value="EXPIRED">Expired</option>
                        <option value="DRAFT">Draft</option>
                    </select>

                </div>

                {/* POSTS */}
                <div className="space-y-3">

                    {filteredPosts.map(p => (

                        <div
                            key={p._id}
                            className="bg-white border rounded-xl p-5 flex justify-between items-center"
                        >

                            <div>
                                <div className="font-semibold">{p.title}</div>
                                <div className="text-sm text-gray-500">{p.companyName}</div>
                            </div>

                            <select
                                value={p.status}
                                onChange={e => changeStatus(p._id, e.target.value)}
                                className="border rounded px-3 py-1 text-sm"
                            >
                                <option value="PUBLISHED">Published</option>
                                <option value="PAUSED">Paused</option>
                                <option value="EXPIRED">Expired</option>
                                <option value="DRAFT">Draft</option>
                            </select>

                        </div>

                    ))}

                    {filteredPosts.length === 0 && (
                        <div className="text-center text-gray-400 pt-10">
                            No posts found
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
