import { useEffect, useState } from "react";

import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

export default function MyInternshipPosts({
    onViewDashboard,
    onViewRecommended,
    onViewPosts,
    onLogout,
    onClickNotification,
}) {

    const unreadCount = getUnreadCount();
    const [posts, setPosts] = useState([]);

    // MOCK DATA
    useEffect(() => {
        setPosts([
            {
                _id: "1",
                title: "Frontend Developer Intern",
                companyName: "ABC Company",
                status: "PUBLISHED",
            },
            {
                _id: "2",
                title: "Backend Developer Intern",
                companyName: "XYZ Tech",
                status: "PAUSED",
            },
            {
                _id: "3",
                title: "UI/UX Intern",
                companyName: "Design Studio",
                status: "DRAFT",
            },
        ]);
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="My Internship Posts"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <RecruiterTabBar
                active="recruiter-posts"
                onViewDashboard={onViewDashboard}
                onViewRecommended={onViewRecommended}
                onViewPosts={onViewPosts}
            />

            <div className="max-w-5xl mx-auto p-8 space-y-4">

                {posts.map(p => (

                    <div
                        key={p._id}
                        className="bg-white border rounded-xl p-5 flex justify-between items-center"
                    >

                        <div>
                            <div className="font-semibold">{p.title}</div>
                            <div className="text-sm text-gray-500">
                                {p.companyName}
                            </div>
                        </div>

                        <span className="border px-3 py-1 rounded-lg text-sm">
                            {p.status}
                        </span>

                    </div>

                ))}

                {posts.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        No internship posts yet.
                    </div>
                )}

            </div>
        </div>
    );
}
