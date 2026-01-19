import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import AdminTabBar from "../components/AdminTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

const DEFAULT_MOCK_DATA = {
    matchScore: 85,
    skillsIdentified: 12,
    yearsExperience: 3,
    matchedPositionsCount: 5,
    skillGroups: [
        { title: "Programming Languages", items: ["Python", "JavaScript", "Java", "C++"] },
        { title: "Frameworks", items: ["ReactJS", "Node.js", "Django", "Next.js"] },
        { title: "Tools", items: ["Git", "Docker", "AWS", "Figma"] }
    ],
    experience: [
        {
            title: "Fullstack Developer",
            duration: "1 year",
            desc: "Built scalable web applications using MERN stack."
        },
        {
            title: "Frontend Intern",
            duration: "6 months",
            desc: "Assisted in developing user interfaces with React and Tailwind."
        }
    ],
    strengthAssessment: {
        technical: 85,
        experience: 70,
        education: 90
    },
    matchedPositions: [
        { title: "Frontend Developer", score: 95 },
        { title: "Backend Developer", score: 88 },
        { title: "DevOps Engineer", score: 65 }
    ]
};

export default function CVParsingScreen({
    onViewDashboard,
    onViewCVParsing,
    onViewUserManagement,
    onViewSystemReport,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();
    const [data, setData] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('parsedCVResult');
        if (savedData) {
            setData(JSON.parse(savedData));
        } else {
            setData(DEFAULT_MOCK_DATA);
        }
    }, []);

    const handleSaveProfile = () => {
        alert("✅ Data saved to candidate profile successfully!");
        // Logic lưu vào database sẽ ở đây
    };

    const handleDownloadReport = () => {
        alert("📥 Downloading PDF report...");
        // Logic tải file PDF sẽ ở đây
    };

    const handleReUpload = () => {
        // Logic quay lại trang upload
        if (confirm("Go back to upload new CV?")) {
            localStorage.removeItem('parsedCVResult');
            window.location.reload();
        }
    };

    if (!data) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            <AppHeader
                title="ISRS – CV Parsing Result"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <AdminTabBar
                active="cv-parsing"
                onViewDashboard={onViewDashboard}
                onViewCVParsing={onViewCVParsing}
                onViewUserManagement={onViewUserManagement}
                onViewSystemReport={onViewSystemReport}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatBox title="Profile Match" value={`${data.matchScore}%`} />
                    <StatBox title="Skills Identified" value={data.skillsIdentified} />
                    <StatBox title="Years Experience" value={data.yearsExperience} />
                    <StatBox title="Matched Positions" value={data.matchedPositionsCount} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card title="Identified Skills">
                            {data.skillGroups.map((group, index) => (
                                <SkillGroup key={index} title={group.title} items={group.items} />
                            ))}
                        </Card>

                        <Card title="Experience Summary">
                            {data.experience.map((exp, index) => (
                                <ExperienceItem
                                    key={index}
                                    title={exp.title}
                                    duration={exp.duration}
                                    desc={exp.desc}
                                />
                            ))}
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card title="Strength Assessment">
                            <Progress label="Technical Skills" value={data.strengthAssessment.technical} />
                            <Progress label="Project Experience" value={data.strengthAssessment.experience} />
                            <Progress label="Education Match" value={data.strengthAssessment.education} />
                        </Card>

                        <Card title="Top Matched Positions">
                            {data.matchedPositions.map((pos, index) => (
                                <MatchedPosition key={index} title={pos.title} score={pos.score} />
                            ))}
                        </Card>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Is this analysis correct? Please review before saving.
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleReUpload}
                                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                ↺ Re-analyze
                            </button>
                            <button
                                onClick={handleDownloadReport}
                                className="px-6 py-2 border border-slate-800 text-slate-800 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                📥 Export PDF
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="px-6 py-2 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors shadow-md"
                            >
                                Save to Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBox({ title, value }) {
    return (
        <div className="bg-white border p-6 text-center shadow-sm rounded-lg">
            <div className="text-3xl font-bold text-slate-800">{value}</div>
            <div className="text-sm text-gray-500 mt-1 uppercase font-semibold">{title}</div>
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-white border p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2 text-slate-700">{title}</h3>
            {children}
        </div>
    );
}

function SkillGroup({ title, items }) {
    return (
        <div className="mb-4">
            <div className="text-sm font-semibold mb-2 text-gray-600">{title}</div>
            <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 text-sm rounded-full">
                        {i}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Progress({ label, value }) {
    return (
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1 font-medium">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                    className="bg-slate-800 h-2.5 rounded-full"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function ExperienceItem({ title, duration, desc }) {
    return (
        <div className="border-l-4 border-slate-800 pl-4 mb-6">
            <div className="font-bold text-base">{title}</div>
            <div className="text-xs text-gray-500 mb-1">{duration}</div>
            <div className="text-sm text-gray-700 leading-relaxed">{desc}</div>
        </div>
    );
}

function MatchedPosition({ title, score }) {
    return (
        <div className="border p-3 mb-3 flex justify-between items-center rounded-lg bg-gray-50">
            <div className="font-medium">{title}</div>
            <div className={`font-bold ${score >= 90 ? 'text-green-600' : score >= 80 ? 'text-blue-600' : 'text-yellow-600'}`}>
                {score}%
            </div>
        </div>
    );
}