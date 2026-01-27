import { AppHeader } from "../components/AppHeader";
import StudentTabBar from "../components/StudentTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

export default function CVParsingScreen({
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onViewCVParsing,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">
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
            <div className="max-w-7xl mx-auto p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatBox title="Profile Match" value="85%" />
                    <StatBox title="Skills Identified" value="12" />
                    <StatBox title="Years Experience" value="3" />
                    <StatBox title="Matched Positions" value="24" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* LEFT */}
                    <div className="space-y-6">
                        <Card title="Identified Skills">
                            <SkillGroup title="Programming Languages" items={["Python", "JavaScript", "Java", "C++"]} />
                            <SkillGroup title="Frameworks" items={["React", "Node.js", "Django"]} />
                            <SkillGroup title="Tools" items={["Git", "Docker", "AWS"]} />
                        </Card>

                        <Card title="Experience Summary">
                            <ExperienceItem
                                title="Project Title 1"
                                duration="6 months"
                                desc="Built web application using React and Node.js"
                            />
                            <ExperienceItem
                                title="Project Title 2"
                                duration="3 months"
                                desc="Developed REST APIs with Django"
                            />
                        </Card>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6">
                        <Card title="Strength Assessment">
                            <Progress label="Technical Skills" value={85} />
                            <Progress label="Project Experience" value={70} />
                            <Progress label="Education Match" value={90} />
                        </Card>

                        <Card title="Top Matched Positions">
                            <MatchedPosition title="Frontend Developer Intern" score={95} />
                            <MatchedPosition title="Backend Developer Intern" score={92} />
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}

/* ================= COMPONENTS ================= */

function StatBox({ title, value }) {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-gray-500 mt-1">{title}</div>
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6">
            <h3 className="font-semibold mb-4">{title}</h3>
            {children}
        </div>
    );
}

function SkillGroup({ title, items }) {
    return (
        <div className="mb-4">
            <div className="text-sm font-medium mb-2">{title}</div>
            <div className="flex flex-wrap gap-2">
                {items.map((i) => (
                    <span key={i} className="border rounded-lg px-3 py-1 text-sm bg-slate-50">
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
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                    className="bg-slate-800 h-2"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function ExperienceItem({ title, duration, desc }) {
    return (
        <div className="border-l-4 border-slate-800 pl-4 mb-4">
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-gray-500">{duration}</div>
            <div className="text-sm mt-1">{desc}</div>
        </div>
    );
}

function MatchedPosition({ title, score }) {
    return (
        <div className="border rounded-xl p-4 mb-3 flex justify-between items-center">
            <div>{title}</div>
            <div className="font-bold">{score}%</div>
        </div>
    );
}
