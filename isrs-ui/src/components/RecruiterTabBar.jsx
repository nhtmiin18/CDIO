export default function RecruiterTabBar({
    active,
    onViewDashboard,
    onCreatePost,
    onViewRecommended,
}) {
    const tabClass = (key) =>
        `px-4 py-2 cursor-pointer ${active === key
            ? "border-b-2 border-blue-600 font-semibold"
            : "text-gray-500"
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
                className={tabClass("create-internship-post")}
                onClick={onCreatePost}
            >
                Create Post
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
