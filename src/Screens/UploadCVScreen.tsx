import React, { useState, useRef } from "react";
import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar.jsx";

type Props = {
    onClickNotification: () => void;
    onUploadCV: () => void;
    onLogout: () => void;
    onViewProfile: () => void;
    onViewInternship: () => void;
    onViewDashboard: () => void;
    onViewCVParsing: () => void;
};

export default function UploadCVScreen({
    onClickNotification,
    onUploadCV,
    onLogout,
    onViewDashboard,
    onViewInternship,
    onViewProfile,
    onViewCVParsing,
}: Props) {
    const unreadCount = getUnreadCount();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleUploadProcess = async () => {
        if (!selectedFile) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const res = await fetch("http://localhost:5000/api/upload-cv", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                onViewCVParsing();
            } else {
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Server connection error.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-slate-800">
            <AppHeader
                title="ISRS – Upload CV"
                onClickNotification={onClickNotification}
                onLogout={onLogout}
                notificationCount={unreadCount}
            />

            <StudentTabBar
                active="upload-cv"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-5xl mx-auto p-8 space-y-8">
                {selectedFile && (
                    <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500 transition-all">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-bold text-lg text-slate-800">
                                    {selectedFile.name}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {(selectedFile.size / 1024).toFixed(2)} KB • Ready to upload
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleUploadProcess}
                                    disabled={loading}
                                    className="px-6 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-700 transition disabled:bg-gray-400"
                                >
                                    {loading ? "Analyzing..." : "Analyze CV"}
                                </button>
                                <button
                                    onClick={handleRemoveFile}
                                    disabled={loading}
                                    className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white p-6 rounded-xl shadow">
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={handleBrowseClick}
                    >
                        <input
                            type="file"
                            accept=".pdf"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="text-5xl mb-4">📄</div>
                        <div className="font-bold text-lg text-slate-700">
                            {loading ? "Uploading & Processing..." : "Click or Drag to upload your CV"}
                        </div>

                        {!loading && (
                            <>
                                <div className="text-sm text-gray-500 my-2">or</div>
                                <button className="px-6 py-3 bg-white border border-gray-300 text-slate-700 rounded-lg font-semibold hover:bg-gray-100 transition">
                                    Browse files
                                </button>
                                <div className="text-xs text-gray-500 mt-4">
                                    PDF only (max 5MB)
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}