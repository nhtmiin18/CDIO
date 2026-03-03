import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";
import StudentTabBar from "../components/StudentTabBar";

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

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – My Profile"
                onClickNotification={onClickNotification}
                user={JSON.parse(localStorage.getItem("user") || "null")}
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

                    {/* PHOTO */}
                    <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">
                        <div className="w-32 h-32 rounded-full border mx-auto mb-4 flex items-center justify-center text-gray-400">
                            PHOTO
                        </div>

                        <button className="px-5 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition">
                            Upload Photo
                        </button>

                    </div>

                    {/* STATS */}
                    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-3 text-sm">

                        <Stat label="Profile Completion" value="75%" />
                        <Stat label="Total Matches" value="12" />
                        <Stat label="Profile Views" value="48" />
                        <Stat label="Avg Match Score" value="84%" />

                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="md:col-span-2 bg-white rounded-2xl border shadow-sm p-6 space-y-5">

                    <h2 className="font-semibold text-lg">
                        Basic Information
                    </h2>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">

                        <Input label="Full Name" value={fullName} setValue={setFullName} />
                        <Input label="Email" value={email} setValue={setEmail} />

                        <Input label="Phone Number" value={phone} setValue={setPhone} />
                        <Input label="Address" value={address} setValue={setAddress} />

                        <Input label="University" value={university} setValue={setUniversity} />
                        <Input label="Major" value={major} setValue={setMajor} />

                    </div>


                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 pt-4">

                        <button className="px-5 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition">
                            Cancel
                        </button>

                        <button className="px-6 py-2 rounded-xl border-2 border-slate-400 bg-black text-white">
                            Save
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}

/* ===== SMALL COMPONENTS ===== */

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

function Stat({ label, value }) {
    return (
        <div className="flex justify-between border-b pb-2 last:border-none">
            <span>{label}</span>
            <b>{value}</b>
        </div>
    );
}