<<<<<<< HEAD
﻿import { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { AppHeader } from "../components/AppHeader";
=======
﻿import { AppHeader } from "../components/AppHeader";
>>>>>>> e696b08a6fe9e785d9fb661802c613595a2580e0
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";

export default function AdminDashboard({
    onViewDashboard,
    onViewCVParsing,
    onViewUserManagement,
    onViewSystemReport,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    const [overview, setOverview] = useState(null);
    const [activities, setActivities] = useState([]);
    const [topInternships, setTopInternships] = useState([]);
    const [usage, setUsage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [o, a, t, u] = await Promise.all([
                axios.get(`${API}/overview`),
                axios.get(`${API}/activities`),
                axios.get(`${API}/top-internships`),
                axios.get(`${API}/usage`),
            ]);

            setOverview(o.data);
            setActivities(a.data);
            setTopInternships(t.data);
            setUsage(u.data);
        } catch (err) {
            console.error("❌ Admin Dashboard API error:", err);
        } finally {
            setLoading(false);
        }
    };

    /* ===== LOADING ===== */
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Loading admin dashboard...
            </div>
        );
    }

    /* ===== API FAIL ===== */
    if (!overview) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500">
                Failed to load admin dashboard data
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            <AppHeader
                title="ISRS – Admin Dashboard"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="admin-dashboard"
                onViewDashboard={onViewDashboard}
                onViewCVParsing={onViewCVParsing}
                onViewUserManagement={onViewUserManagement}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8">
                {/* ===== OVERVIEW ===== */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Stat title="Total Users" value={overview.totalUsers} />
                    <Stat title="Students" value={overview.students} />
                    <Stat title="Recruiters" value={overview.recruiters} />
                    <Stat title="CV Parsed" value={5} />
                </div>

                {/* ===== SYSTEM ACTIVITY ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activities */}
                    <Card title="Recent Activities">
                        <ul className="space-y-3">
                            {activities.length === 0 && (
                                <li className="text-sm text-gray-400">
                                    No recent activity
                                </li>
                            )}

                            {activities.map((a, i) => (
                                <li
                                    key={i}
                                    className="text-sm text-gray-600 border-b pb-2 last:border-none"
                                >
                                    {a.message}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Most Applied Internships */}
                    <Card title="Most Applied Internships">
                        <ul className="space-y-3">
                            {topInternships.length === 0 && (
                                <li className="text-sm text-gray-400">
                                    No data
                                </li>
                            )}

                            {topInternships.map((i, idx) => (
                                <li
                                    key={idx}
                                    className="flex justify-between text-sm"
                                >
                                    <span>{i.title}</span>
                                    <span className="font-semibold">
                                        {i.appliedCount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* ===== USAGE STATISTICS ===== */}
                <Card title="Usage Statistics">
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={usage}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" fill="#0f172a" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}

/* ===== SMALL COMPONENTS ===== */

function Stat({ title, value }) {
    return (
        <div className="bg-white border rounded-xl p-6">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-3xl font-bold mt-2">{value}</div>
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-white border rounded-xl p-6">
            <h3 className="font-bold mb-4">{title}</h3>
            {children}
        </div>
    );
}
