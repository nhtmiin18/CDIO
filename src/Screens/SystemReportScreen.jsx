import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";
const COLORS = ["#22c55e", "#ef4444"];

export default function SystemReportScreen({
    onViewDashboard,
    onViewUserManagement,
    onViewInternshipPosts,
    onViewSystemReport,
    onClickNotification,
    onLogout,
}) {
    const unreadCount = getUnreadCount();

    const [report, setReport] = useState({
        totalCV: 0,
        parsedSuccess: 0,
        parsedFailed: 0,
        noSkills: 0,
        noPhone: 0,
        noEmail: 0
    });

    useEffect(() => {
        axios.get(`${API}/system-report`)
            .then(r => setReport(r.data))
            .catch(err => console.error(err));
    }, []);

    const pieData = [
        { name: "Parsed", value: report.parsedSuccess },
        { name: "Failed", value: report.parsedFailed }
    ];

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – System Report"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="admin-system-report"
                onViewDashboard={onViewDashboard}
                onViewUserManagement={onViewUserManagement}
                onViewInternshipPosts={onViewInternshipPosts}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-6xl mx-auto p-8 space-y-8">

                <div className="grid grid-cols-3 gap-6">
                    <Stat title="Total CV" value={report.totalCV} />
                    <Stat title="Parsed Success" value={report.parsedSuccess} />
                    <Stat title="Parsed Failed" value={report.parsedFailed} />
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6 flex justify-center">
                    <PieChart width={380} height={300}>
                        <Pie data={pieData} dataKey="value" outerRadius={100} label>
                            {pieData.map((e, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                    <h3 className="font-semibold mb-3">CV Data Quality</h3>

                    <p>Missing Skills: {report.noSkills}</p>
                    <p>Missing Phone: {report.noPhone}</p>
                    <p>Missing Email: {report.noEmail}</p>
                </div>

            </div>
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="text-xs uppercase text-gray-500">{title}</div>
            <div className="text-3xl font-bold mt-1">{value}</div>
        </div>
    );
}
