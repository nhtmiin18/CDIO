import { useState, useEffect, useRef } from "react";
import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar";

export default function StudentProfile({
    onViewDashboard,
    onViewProfile,
    onUploadCV,
    onViewInternship,
    onViewCVParsing,
    onLogout,
    onClickNotification,
}) {

    const unreadCount = getUnreadCount();
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [photoPreview, setPhotoPreview] = useState(null);
    const fileInputRef = useRef(null);

    /* ================= LOAD USER DATA ================= */
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/students/${currentUser._id}`
                );

                if (!response.ok) {
                    throw new Error("Cannot fetch student");
                }

                const data = await response.json();

                setFullName(data.fullName || "");
                setEmail(data.email || "");
                setUniversity(data.university || "");
                setMajor(data.major || "");
                setPhone(data.phone || "");
                setAddress(data.address || "");

                // nếu backend có lưu photo url
                if (data.photo) {
                    setPhotoPreview(`http://localhost:5000/${data.photo}`);
                }

            } catch (error) {
                console.error(error);
            }
        };

        if (currentUser?._id) {
            fetchStudent();
        }

    }, [currentUser?._id]);

    /* ================= SAVE PROFILE ================= */
    const handleSave = async () => {
        try {
            const updatedUser = {
                fullName,
                email,
                university,
                major,
                phone,
                address,
            };

            const response = await fetch(
                `http://localhost:5000/api/students/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedUser),
                }
            );

            if (!response.ok) {
                throw new Error("Update failed");
            }

            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));

            alert("Profile updated successfully!");

        } catch (error) {
            console.error(error);
            alert("Update failed!");
        }
    };

    /* ================= UPLOAD PHOTO ================= */
    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "image/png") {
            alert("Only PNG files are allowed!");
            return;
        }

        // preview ngay
        setPhotoPreview(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("photo", file);

        try {
            const response = await fetch(
                `http://localhost:5000/api/students/${currentUser._id}/photo`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            alert("Photo uploaded successfully!");

        } catch (error) {
            console.error(error);
            alert("Upload failed!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – My Profile"
                onClickNotification={onClickNotification}
                user={currentUser}
                notificationCount={unreadCount}
                onLogout={onLogout}
            />

            <StudentTabBar
                active="profile"
                onViewDashboard={onViewDashboard}
                onViewProfile={onViewProfile}
                onUploadCV={onUploadCV}
                onViewCVParsing={onViewCVParsing}
                onViewInternship={onViewInternship}
            />

            <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT COLUMN */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">

                        <div className="w-32 h-32 rounded-full border mx-auto mb-4 overflow-hidden">
                            {photoPreview ? (
                                <img
                                    src={photoPreview}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    PHOTO
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/png"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            style={{ display: "none" }}
                        />

                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="px-5 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                            Upload Photo
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="md:col-span-2 bg-white rounded-2xl border shadow-sm p-6 space-y-5">

                    <h2 className="font-semibold text-lg">
                        Basic Information
                    </h2>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                        <Input label="Full Name" value={fullName} setValue={setFullName} />
                        <Input label="Email" value={email} setValue={setEmail} />
                        <Input label="Phone Number" value={phone} setValue={setPhone} />
                        <Input label="Address" value={address} setValue={setAddress} />
                        <Input label="University" value={university} setValue={setUniversity} />
                        <Input label="Major" value={major} setValue={setMajor} />

                    </div>

                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            onClick={() => window.location.reload()}
                            className="px-5 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="px-6 py-2 rounded-xl border-2 border-slate-400 bg-black text-white"
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

/* ===== SMALL INPUT COMPONENT ===== */

function Input({ label, value, setValue, type = "text" }) {
    return (
        <div>
            <label className="text-sm">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
            />
        </div>
    );
}