import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";

// icons
import { Bell, User, AlertTriangle, Info } from "lucide-react";

// charts
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

export default function Dashboard() {

    // ===== DASHBOARD STATE =====
    const [stats, setStats] = useState({
        users: 0,
        companies: 0,
        posts: 0
    });

    // ===== CALL API =====
    useEffect(() => {
        getDashboardStats()
            .then(data => {
                setStats(data);
            })
            .catch(err => {
                console.error("Dashboard API error:", err);
            });
    }, []);

    // ===== CHART DATA =====
    const chartData = [
        { name: "Jan", users: 200 },
        { name: "Feb", users: 400 },
        { name: "Mar", users: 600 },
        { name: "Apr", users: 900 },
        { name: "May", users: stats.users }
    ];

    const pieData = [
        { name: "Active", value: stats.posts, color: "#0088FE" },
        { name: "Paused", value: 20, color: "#FFBB28" },
        { name: "Expired", value: 15, color: "#FF8042" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-slate-800">

            {/* HEADER */}
            <header className="flex justify-between items-center mb-8 bg-white p-4 rounded shadow">
                <h1 className="text-xl font-bold">ISRS – Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Bell />
                    <User />
                </div>
            </header>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <StatCard label="Users" value={stats.users} />
                <StatCard label="Companies" value={stats.companies} />
                <StatCard label="Internship Posts" value={stats.posts} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LINE CHART */}
                <div className="lg:col-span-2 bg-white p-5 rounded shadow">
                    <h3 className="font-bold mb-4">User Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="users" stroke="#4f46e5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div className="bg-white p-5 rounded shadow">
                    <h3 className="font-bold mb-4">Post Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" outerRadius={80}>
                                {pieData.map((e, i) => (
                                    <Cell key={i} fill={e.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ALERTS */}
            <div className="mt-6 bg-red-50 p-4 rounded border border-red-200">
                <div className="flex items-center gap-2 text-red-700 font-bold">
                    <AlertTriangle size={16} /> Alert
                </div>
                <p className="text-sm">Suspicious login detected</p>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <Info size={16} /> System
                </div>
                <p className="text-sm">System running normally</p>
            </div>
        </div>
    );
}

// ===== SMALL COMPONENT =====
function StatCard({ label, value }) {
    return (
        <div className="bg-white p-4 rounded shadow text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
        </div>
    );
}
