import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import RecruiterTabBar from "../components/RecruiterTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

function CreateInternshipPost({
    onBackDashboard,
    onLogout,
    onViewDashboard,
    onCreatePost,
    onViewRecommended,
    onClickNotification,
}) {
    const [benefits, setBenefits] = useState([]);
    const [benefitInput, setBenefitInput] = useState("");
    const unreadCount = getUnreadCount();

    const addBenefit = () => {
        if (benefitInput.trim()) {
            setBenefits([...benefits, benefitInput.trim()]);
            setBenefitInput("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <AppHeader
                title="Create Internship Post"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            {/* TAB BAR */}
            <RecruiterTabBar
                active="create-internship-post"
                onViewDashboard={onViewDashboard}
                onCreatePost={onCreatePost}
                onViewRecommended={onViewRecommended}
            />

            {/* CONTENT */}
            <div className="p-8 max-w-3xl">
                <h2 className="text-xl font-semibold mb-6">
                    New Internship Post
                </h2>

                <div className="mb-4">
                    <label>Internship Title</label>
                    <input className="w-full border p-2" />
                </div>

                <div className="mb-4">
                    <label>Company Name</label>
                    <input className="w-full border p-2" />
                </div>

                <div className="mb-4">
                    <label>Description</label>
                    <textarea className="w-full border p-2" rows={4} />
                </div>

                <div className="mb-6">
                    <label>Benefits</label>
                    <div className="mb-2">
                        {benefits.map((b, i) => (
                            <span key={i} className="mr-2">
                                {b}
                            </span>
                        ))}
                    </div>
                    <input
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        className="border p-2 mr-2"
                    />
                    <button onClick={addBenefit}>
                        Add
                    </button>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", gap: 12 }}>
                    <button
                        onClick={() => {
                            onBackDashboard();
                        }}
                    >
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateInternshipPost;
