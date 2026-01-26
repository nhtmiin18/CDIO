import React, { useState, useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
import StudentTabBar from "../components/StudentTabBar"; // ĐỔI SANG STUDENT TAB
import { getUnreadCount } from "../components/notificationsHelper";

export default function CVParsingScreen({
    // Nhận các props điều hướng của Student
    onViewDashboard,
    onViewProfile,
    onViewInternship,
    onUploadCV,
    onLogout,
    onClickNotification,
}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const analyzeLatestCV = async () => {
            try {
                // Gọi API để lấy dữ liệu từ file vừa upload ở bước trước
                const res = await fetch("http://localhost:5000/api/analyze-latest");
                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                } else {
                    console.log("No CV found");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        analyzeLatestCV();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            <AppHeader
                title="ISRS – Analysis Result"
                onClickNotification={onClickNotification}
                notificationCount={getUnreadCount ? getUnreadCount() : 0}
                onLogout={onLogout}
            />

            {/* Dùng Student Tab Bar để đồng bộ với màn hình Upload */}
            <StudentTabBar
                active="upload-cv" // Vẫn giữ active ở tab Upload hoặc tab khác tùy bạn
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8">

                {loading && (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-slate-800 mx-auto mb-4"></div>
                        <p className="text-xl font-semibold">Analyzing your latest CV...</p>
                    </div>
                )}

                {!loading && !data && (
                    <div className="text-center py-20 bg-white rounded-lg shadow">
                        <h3 className="text-xl text-red-500">No Analysis Data</h3>
                        <p className="text-gray-500 mt-2">Please upload a CV first.</p>
                        <button
                            onClick={onUploadCV}
                            className="mt-4 px-6 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
                        >
                            Go to Upload
                        </button>
                    </div>
                )}

                {data && (
                    <>
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Analysis Report</h2>
                                <p className="text-green-600">✓ Results from your latest upload</p>
                            </div>
                            <button onClick={onUploadCV} className="text-blue-600 hover:underline">
                                Upload New CV
                            </button>
                        </div>

                        {/* --- Phần hiển thị kết quả (Giữ nguyên như cũ) --- */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <StatBox title="Match Score" value={`${data.matchScore || 0}%`} />
                            <StatBox title="Skills" value={data.skillsIdentified || 0} />
                            <StatBox title="Experience" value={`${data.yearsExperience || 0} Years`} />
                            <StatBox title="Positions" value={data.matchedPositionsCount || 0} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <Card title="Identified Skills & Contact">
                                    {data.skillGroups.map((group, idx) => (
                                        <SkillGroup key={idx} title={group.title} items={group.items} />
                                    ))}
                                </Card>
                                <Card title="Experience Analysis">
                                    {data.experience.map((exp, idx) => (
                                        <ExperienceItem key={idx} title={exp.title} duration={exp.duration} desc={exp.desc} />
                                    ))}
                                </Card>
                            </div>
                            <div className="space-y-6">
                                <Card title="Strength Assessment">
                                    <Progress label="Technical Skills" value={data.strengthAssessment.technical} />
                                    <Progress label="Project Experience" value={data.strengthAssessment.experience} />
                                    <Progress label="Education Match" value={data.strengthAssessment.education} />
                                </Card>
                                <Card title="Suggested Positions">
                                    {data.matchedPositions.map((pos, idx) => (
                                        <MatchedPosition key={idx} title={pos.title} score={pos.score} />
                                    ))}
                                </Card>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// (Giữ nguyên các component con StatBox, Card, SkillGroup)
function StatBox({ title, value }) {
    return (<div className="bg-white border p-6 text-center shadow-sm rounded-lg"><div className="text-3xl font-bold text-slate-800">{value}</div><div className="text-sm text-gray-500 mt-1 uppercase font-semibold">{title}</div></div>);
}
function Card({ title, children }) {
    return (<div className="bg-white border p-6 rounded-lg shadow-sm"><h3 className="font-bold text-lg mb-4 text-slate-800">{title}</h3>{children}</div>);
}
function SkillGroup({ title, items }) {
    return (<div className="mb-4"><div className="text-sm font-medium mb-2 text-gray-600">{title}</div><div className="flex flex-wrap gap-2">{items.map((i) => (<span key={i} className="border border-gray-200 bg-gray-50 px-3 py-1 text-sm rounded-md text-slate-700">{i}</span>))}</div></div>);
}
function Progress({ label, value }) {
    return (<div className="mb-4"><div className="flex justify-between text-sm mb-1 font-medium"><span>{label}</span><span>{value}%</span></div><div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden"><div className="bg-slate-800 h-2.5 rounded-full" style={{ width: `${value}%` }} /></div></div>);
}
function ExperienceItem({ title, duration, desc }) {
    return (<div className="border-l-4 border-slate-800 pl-4 mb-4"><div className="font-bold text-slate-800">{title}</div><div className="text-xs text-gray-500 font-semibold">{duration}</div><div className="text-sm mt-1 text-gray-600">{desc}</div></div>);
}
function MatchedPosition({ title, score }) {
    return (<div className="border p-4 mb-3 flex justify-between items-center rounded-lg bg-gray-50"><div className="font-medium text-slate-700">{title}</div><div className={`font-bold ${score >= 90 ? 'text-green-600' : 'text-blue-600'}`}>{score}%</div></div>);
}