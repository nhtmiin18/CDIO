import { useEffect, useState } from "react";
import axios from "axios";
import { AppHeader } from "../components/AppHeader";
import StudentTabBar from "../components/StudentTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const CVParsing = ({
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onViewCVParsing,
    onLogout,
    onClickNotification,
}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const unreadCount = getUnreadCount();

    useEffect(() => {
        const fetchParsed = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                const id = user.id;

                const res = await axios.get(
                    `http://localhost:5000/api/student/parse/${id}`
                );

                setData(res.data);

            } catch (err) {
                console.error(
                    "GET PARSE ERROR:",
                    err.response?.data || err.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchParsed();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Loading CV Analysis...
            </div>
        );

    if (!data)
        return (
            <div className="min-h-screen flex items-center justify-center text-xl">
                No parsed data found
            </div>
        );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800">
            <AppHeader
                title="ISRS – CV Parsing Result"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="student-cv-parsing"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewCVParsing={onViewCVParsing}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-6xl mx-auto p-8 space-y-8">

                {/* PROFILE SCORE */}
                <div className="bg-gradient-to-r from-indigo-600 to-slate-800 text-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-sm uppercase tracking-wide opacity-80">
                        Profile Match Score
                    </h2>
                    <div className="text-5xl font-bold mt-2">
                        {data.profileScore}%
                    </div>
                </div>

                {/* POSTS GRID */}
                <div className="grid md:grid-cols-2 gap-6">
                    {data.posts?.map((post, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition"
                        >
                            <h3 className="text-lg font-semibold mb-4">
                                {post.title}
                            </h3>

                            <ScoreBar label="Total Score" value={post.score} highlight />

                            <ScoreBar label="Skill Match" value={post.skillScore} />

                            <ScoreBar label="Major Match" value={post.majorScore} />

                            <ScoreBar label="Experience Match" value={post.experienceScore} />

                            <ScoreBar label="GPA Match" value={post.gpaScore} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

function ScoreBar({ label, value, highlight }) {
    return (
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span className={`font-semibold ${highlight ? "text-indigo-600" : ""}`}>
                    {value}%
                </span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                    className={`h-3 rounded-full transition-all duration-500 
                        ${highlight
                            ? "bg-gradient-to-r from-indigo-500 to-slate-800"
                            : "bg-slate-700"
                        }`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

export default CVParsing;