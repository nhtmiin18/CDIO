import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import StudentTabBar from "../components/StudentTabBar";
import { getUnreadCount } from "../components/notificationsHelper";

type Props = {
    onLogout: () => void;
    onClickNotification: () => void;
    onViewDashboard: () => void;
    onViewProfile: () => void;
    onUploadCV: () => void;
    onViewInternship: () => void;
    onViewCVParsing: () => void;
};

type InternshipPost = {
    _id: string;
    title: string;
    companyName: string;
    location: string;
    duration: string;
    major: string;
    experienceLevel: string;
    minimumGPA: number;
    benefits?: string[];
    skills: {
        programmingLanguages?: string[];
        frameworks?: string[];
        tools?: string[];
    };
};

export default function InternshipPostDetail({
    onLogout,
    onClickNotification,
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onViewCVParsing,
}: Props) {

    const unreadCount = getUnreadCount();
    const [posts, setPosts] = useState<InternshipPost[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/posts")
            .then(res => res.json())
            .then(data => {
                console.log("POST DATA:", data);
                setPosts(data);
            })
            .catch(err => console.error(err));
    }, []);

    const Badge = ({ text }: { text: string }) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {text}
        </span>
    );

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800">

            <AppHeader
                title="ISRS – Internship Detail"
                onClickNotification={onClickNotification}
                user={JSON.parse(localStorage.getItem("user") || "null")}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="internships"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
                onViewCVParsing={onViewCVParsing}
            />

            <div className="max-w-6xl mx-auto p-8 space-y-6">

                {posts.map((post) => (
                    <div
                        key={post._id}
                        className="bg-white border rounded-2xl shadow-sm p-8"
                    >

                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 font-medium">
                                {post.companyName}
                            </p>
                        </div>

                        {/* 2 Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                            {/* LEFT SIDE */}
                            <div className="space-y-4">

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <p><strong>Location:</strong> {post.location}</p>
                                    <p><strong>Duration:</strong> {post.duration}</p>
                                    <p><strong>Major:</strong> {post.major}</p>
                                    <p><strong>Experience:</strong> {post.experienceLevel}</p>
                                    <p><strong>Minimum GPA:</strong> {post.minimumGPA}</p>
                                </div>

                                {/* Benefits */}
                                {post.benefits && post.benefits.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Benefits</h3>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                            {post.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Apply Button */}
                                <div className="pt-4">
                                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition">
                                        Apply Now
                                    </button>
                                </div>

                            </div>

                            {/* RIGHT SIDE - REQUIRED SKILLS */}
                            <div className="space-y-6">

                                <h3 className="font-semibold text-lg">
                                    Required Skills
                                </h3>

                                {/* Programming Languages */}
                                {post.skills?.programmingLanguages && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">
                                            Programming Languages
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.skills.programmingLanguages.map((skill, i) => (
                                                <Badge key={i} text={skill} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Frameworks */}
                                {post.skills?.frameworks && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">
                                            Frameworks
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.skills.frameworks.map((skill, i) => (
                                                <Badge key={i} text={skill} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tools */}
                                {post.skills?.tools && (
                                    <div>
                                        <p className="text-sm font-medium mb-2">
                                            Tools
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {post.skills.tools.map((skill, i) => (
                                                <Badge key={i} text={skill} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                ))}

                {posts.length === 0 && (
                    <div className="text-center text-gray-500">
                        No internship posts available.
                    </div>
                )}

            </div>
        </div>
    );
}