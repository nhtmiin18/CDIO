import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar";
import { useRef, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

type Props = {
    onClickNotification: () => void;
    onUploadCV: () => void;
    onLogout: () => void;
    onViewProfile: () => void;
    onViewInternship: () => void;
    onViewCVParsing: () => void;
    onViewDashboard: () => void;
};

type CV = {
    _id: string;
    fullName: string;
    major: string;
    experiences: number;
    GPA: number;
    skills: {
        programmingLanguages: string[];
        frameworks: string[];
        tools: string[];
    };
};

export default function UploadCVScreen({
    onClickNotification,
    onUploadCV,
    onLogout,
    onViewDashboard,
    onViewInternship,
    onViewCVParsing,
    onViewProfile,
}: Props) {

    const unreadCount = getUnreadCount();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentCV, setCurrentCV] = useState<CV | null>(null);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        const fetchCV = async () => {
            try {
                const res = await axios.get<CV>(
                    `http://localhost:5000/api/cv/${user._id}`
                );
                setCurrentCV(res.data);
            } catch {
                setCurrentCV(null);
            }
        };

        if (user?._id) {
            fetchCV();
        }
    }, [user?._id]);

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Chỉ được upload file PDF!");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File phải nhỏ hơn 5MB!");
            return;
        }

        setSelectedFile(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Vui lòng chọn file!");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("cv", selectedFile);
            formData.append("_id", user._id);

            const res = await axios.post<CV>(
                "http://localhost:5000/api/cv/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setCurrentCV(res.data);
            setSelectedFile(null);

            alert("Upload & Parse thành công!");

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as AxiosError<{ message: string }>;
                alert(err.response?.data?.message || "Upload thất bại!");
            } else {
                alert("Có lỗi xảy ra!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <AppHeader
                title="ISRS – Upload CV"
                onClickNotification={onClickNotification}
                user={user}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="upload-cv"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewCVParsing={onViewCVParsing}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-7xl mx-auto p-8 space-y-8">

                {/* Upload Box */}
                <div className="bg-white rounded-2xl border shadow-sm p-6">
                    <div className="border-2 border-dashed rounded-xl p-12 text-center bg-slate-50">

                        <input
                            type="file"
                            accept="application/pdf"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {selectedFile && (
                            <div className="mb-4 flex justify-center">
                                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow text-sm">
                                    <span className="text-gray-700">
                                        {selectedFile.name}
                                    </span>
                                    <button
                                        onClick={handleRemoveFile}
                                        className="text-red-500 font-bold hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center gap-8 mt-6">
                            <button
                                onClick={handleBrowseClick}
                                className="px-6 py-3 bg-slate-800 text-white rounded-lg font-semibold"
                            >
                                Browse files
                            </button>

                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || loading}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50"
                            >
                                {loading ? "Uploading..." : "Upload & Parse"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* CV Display Card */}
                {currentCV && (
                    <div className="bg-white rounded-2xl border shadow-sm p-8">

                        {/* TITLE */}
                        <h2 className="text-2xl font-bold text-slate-800 mb-8">
                            CV Extract Information
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12">

                            {/* LEFT SIDE */}
                            <div className="space-y-8">

                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                                        Major
                                    </h3>
                                    <div className="text-lg text-gray-700">
                                        {currentCV.major}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                                        GPA
                                    </h3>
                                    <div className="text-lg text-green-600 font-semibold">
                                        {currentCV.GPA}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                                        Experiences
                                    </h3>
                                    <div className="text-lg text-gray-700">
                                        {currentCV.experiences} years
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="space-y-6">

                                <h3 className="text-xl font-bold text-slate-800">
                                    Skills
                                </h3>

                                <div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        Programming Languages
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {currentCV.skills.programmingLanguages.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        Frameworks
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {currentCV.skills.frameworks.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 mb-2">
                                        Tools
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {currentCV.skills.tools.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}