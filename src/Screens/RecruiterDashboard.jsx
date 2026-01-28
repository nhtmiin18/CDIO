import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

export default function RecruiterDashboard({
    onViewDashboard,
    onViewRecommended,
    onCreatePost,
    onViewPosts,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">

            <AppHeader
                title="ISRS – Recruiter Dashboard"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <RecruiterTabBar
                active="recruiter-dashboard"
                onViewDashboard={onViewDashboard}
                onViewRecommended={onViewRecommended}
                onViewPosts={onViewPosts}
            />

            <div className="max-w-7xl mx-auto p-8">

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatBox title="Active Posts" value="3" />
                    <StatBox title="Total Matches" value="112" />
                    <StatBox title="Shortlisted" value="18" />
                    <StatBox title="Avg Match Score" value="89%" />
                </div>

                {/* CREATE */}
                <button
                    onClick={onCreatePost}
                    className="mb-6 px-6 py-2 rounded-xl bg-black text-white hover:opacity-90"
                >
                    Create Internship Post
                </button>

                <h3 className="font-semibold mb-4">
                    Active Internship Posts
                </h3>

                <PostItem
                    title="Frontend Developer Intern"
                    matches={45}
                    onView={onViewPosts}
                    onViewMatches={onViewRecommended}
                />

                <PostItem
                    title="Backend Developer Intern"
                    matches={38}
                    onView={onViewPosts}
                    onViewMatches={onViewRecommended}
                />

            </div>
        </div>
    );
}

/* ===== COMPONENTS ===== */

function StatBox({ title, value }) {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-3xl font-bold mt-1">{value}</div>
        </div>
    );
}

function PostItem({ title, matches, onView, onViewMatches }) {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6 mb-4">

            <div className="font-semibold">{title}</div>

            <div className="text-sm text-gray-500 mb-3">
                {matches} matched students
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onView}
                    className="px-4 py-1 rounded-lg border hover:bg-slate-50"
                >
                    View Post
                </button>

                <button
                    onClick={onViewMatches}
                    className="px-4 py-1 rounded-lg border hover:bg-slate-50"
                >
                    View Matches
                </button>
            </div>

        </div>
    );
}
