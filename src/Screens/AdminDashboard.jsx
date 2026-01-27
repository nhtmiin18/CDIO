import { useEffect, useState } from "react";
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
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";

export default function AdminDashboard({
    onViewDashboard,
    onViewUserManagement,
    onViewInternshipPosts,
    onViewSystemReport,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    const [overview, setOverview] = useState({});
    const [activities, setActivities] = useState([]);
    const [topInternships, setTopInternships] = useState([]);
    const [usage, setUsage] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
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
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – Admin Dashboard"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="admin-dashboard"
                onViewDashboard={onViewDashboard}
                onViewUserManagement={onViewUserManagement}
                onViewInternshipPosts={onViewInternshipPosts}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8">

                {/* OVERVIEW */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Stat title="Total Users" value={overview?.totalUsers || 0} />
                    <Stat title="Students" value={overview?.students || 0} />
                    <Stat title="Recruiters" value={overview?.recruiters || 0} />
                    <Stat title="CV Parsed" value={overview?.cvParsed || 0} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <Card title="Recent Activities">
                        <ul className="space-y-3">
                            {activities.map((a, i) => (
                                <li key={i} className="text-sm border-b pb-2">
                                    {a.message}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card title="Most Applied Internships">
                        <ul className="space-y-3">
                            {topInternships.map((i, idx) => (
                                <li key={idx} className="flex justify-between text-sm">
                                    <span>{i.title}</span>
                                    <span className="font-semibold">{i.appliedCount}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                </div>

                <Card title="Usage Statistics">
                    <div style={{ width: "100%", height: 260 }}>
                        <ResponsiveContainer>
                            <BarChart data={usage}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="users" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

            </div>
        </div>
    );
}

/* ===== UI ===== */

function Stat({ title, value }) {
    return (
        <div className="bg-white rounded-2xl border p-6">
            <div className="text-sm text-slate-500">{title}</div>
            <div className="text-3xl font-bold mt-2">{value}</div>
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-white rounded-2xl border p-6">
            <h3 className="font-semibold mb-4">{title}</h3>
            {children}
        </div>
    );
}
