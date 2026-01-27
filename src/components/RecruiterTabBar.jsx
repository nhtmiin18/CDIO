export default function RecruiterTabBar({
    active,
    onViewDashboard,
    onViewRecommended,
    onViewPosts
}) {

    const tabClass = (key) =>
        `px-4 py-2 cursor-pointer ${active === key
            ? "border-b-2 border-slate-800 font-semibold"
            : "text-gray-500 hover:text-slate-800"
        }`;

    return (
        <div className="flex gap-6 border-b bg-white px-6">

            <div
                className={tabClass("recruiter-dashboard")}
                onClick={onViewDashboard}
            >
                Dashboard
            </div>

            <div
                className={tabClass("recruiter-posts")}
                onClick={onViewPosts}
            >
                My Posts
            </div>

            <div
                className={tabClass("recommended")}
                onClick={onViewRecommended}
            >
                Recommended Students
            </div>

        </div>
    );
}
