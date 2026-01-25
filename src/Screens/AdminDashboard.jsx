import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

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
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/admin";


export default function AdminDashboard({
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
                title="ISRS � Admin Dashboard"
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

            <div className="max-w-7xl mx-auto p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Stat title="Total Users" value="1,245" />
                    <Stat title="Students" value="856" />
                    <Stat title="Recruiters" value="389" />
                    <Stat title="CV Parsed" value="912" />
                </div>
            </div>
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="bg-white border rounded-xl p-6">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-3xl font-bold mt-2">{value}</div>
        </div>
    );
}
