import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";
export default function RecruiterDashboard({
    onViewDashboard,
    onCreatePost,
    onViewPost,
    onViewRecommended,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            {/* HEADER */}
            <AppHeader
                title="ISRS - Recruiter Dashboard"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <RecruiterTabBar
                active="recruiter-dashboard"
                onViewDashboard={onViewDashboard}
                onCreatePost={onCreatePost}
                onViewRecommended={onViewRecommended}
            />

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto p-8">
                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <StatBox title="Active Posts" value="3" />
                    <StatBox title="Total Matches" value="112" />
                    <StatBox title="Shortlisted" value="18" />
                    <StatBox title="Avg Match Score" value="89%" />
                </div>

                {/* ACTION */}
                <button
                    onClick={onCreatePost}
                    className="mb-6 px-6 py-2 bg-black text-white"
                >
                    Create Internship Post
                </button>

                {/* POSTS */}
                <h3 className="font-semibold mb-4">
                    Active Internship Posts
                </h3>

                <PostItem
                    title="Frontend Developer Intern"
                    matches={45}
                    onView={onViewPost}
                    onViewMatches={onViewRecommended}
                />

                <PostItem
                    title="Backend Developer Intern"
                    matches={38}
                    onView={onViewPost}
                    onViewMatches={onViewRecommended}
                />
            </div>
        </div>
    );
}

/* ===== INLINE COMPONENTS ===== */

function StatBox({ title, value }) {
    return (
        <div className="bg-white border p-6">
            <div className="text-sm text-gray-500">
                {title}
            </div>
            <div className="text-3xl font-bold mt-1">
                {value}
            </div>
        </div>
    );
}

function PostItem({ title, matches, onView, onViewMatches }) {
    return (
        <div className="bg-white border p-6 mb-4">
            <div className="font-semibold">
                {title}
            </div>
            <div className="text-sm text-gray-500 mb-3">
                {matches} matched students
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onView}
                    className="px-4 py-1 border"
                >
                    View Post
                </button>

                <button
                    onClick={onViewMatches}
                    className="px-4 py-1 border"
                >
                    View Matches
                </button>
            </div>
        </div>
    );
}
