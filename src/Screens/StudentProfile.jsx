<<<<<<< Updated upstream
﻿import { AppHeader } from "../components/AppHeader";
=======
﻿import { useState, useEffect } from "react";
import { AppHeader } from "../components/AppHeader";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // State cho form
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [university, setUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [photo, setPhoto] = useState(null);
    
    // Stats
    const [profileViews, setProfileViews] = useState(48);
    const [totalMatches, setTotalMatches] = useState(12);
    const [avgMatchScore, setAvgMatchScore] = useState(84);

    // Fetch profile từ API
    const fetchProfile = async () => {
        console.log('🟢 Bắt đầu fetchProfile');
        console.log('🔍 URL:', 'http://127.0.0.1:5000/api/profile');
        console.log('🔑 Token:', localStorage.getItem('token') ? 'Có' : 'Không');
        try {
            const token = localStorage.getItem('token');
            console.log('1. Token:', token);
            
            const response = await fetch('http://127.0.0.1:5000/api/profile', {
                headers: { 'x-auth-token': token }
            });
            
            console.log('2. Response status:', response.status);
            const data = await response.json();
            console.log('3. Data:', data);
            
            if (data.success) {
                setFullName(data.data.fullName || '');
                setEmail(data.data.email || '');
                setPhone(data.data.phoneNumber || '');
                setAddress(data.data.address || '');
                setUniversity(data.data.university || '');
                setMajor(data.data.major || '');
                setPhoto(data.data.photo);
                setProfileViews(data.data.profileViews || 48);
                setTotalMatches(data.data.totalMatches || 12);
                setAvgMatchScore(data.data.avgMatchScore || 84);
            } else {
                console.log('4. API trả về lỗi:', data.message);
            }
        } catch (error) {
            console.error('5. Lỗi fetch profile:', error);
            console.log('6. Chi tiết lỗi:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    // Xử lý upload photo
    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('photo', file);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:5000/api/profile/photo', {
                method: 'POST',
                headers: {
                    'x-auth-token': token
                },
                body: formData
            });
            
            const data = await response.json();
            if (data.success) {
                alert('Upload ảnh thành công!');
                fetchProfile(); // Tải lại profile
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload thất bại!');
        } finally {
            setUploading(false);
        }
    };

    // Xử lý save thông tin
    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Vui lòng đăng nhập lại!');
                return;
            }
// Update basic info
const basicResponse = await fetch('http://127.0.0.1:5000/api/profile/basic-info', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
    },
    body: JSON.stringify({
        fullName,
        phoneNumber: phone,
        address
    })
});

const basicData = await basicResponse.json();
console.log('Basic info response:', basicData);

// Update university info
const uniResponse = await fetch('http://127.0.0.1:5000/api/profile/university-info', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
    },
    body: JSON.stringify({
        university,
        major
    })
});

const uniData = await uniResponse.json();
console.log('University response:', uniData);

alert('Lưu thông tin thành công!');
fetchProfile();
} catch (error) {
console.error('Save error:', error);
alert('Lưu thất bại! Kiểm tra lại kết nối backend');
} finally {
setSaving(false);
}
};

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-xl">Đang tải thông tin...</div>
            </div>
        );
    }
>>>>>>> Stashed changes

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="ISRS – Student Profile"
                onClickNotification={onClickNotification}
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

            <div className="max-w-7xl mx-auto p-8">

                <div className="bg-white rounded-2xl border shadow-sm p-6">

<<<<<<< Updated upstream
                    <h2 className="font-semibold mb-4">Student Profile</h2>

                    <p>Email: student@email.com</p>
                    <p>University: Duy Tan University</p>
                    <p>Major: Software Engineering</p>
=======
                    {/* PHOTO */}
                    <div className="bg-white rounded-2xl border shadow-sm p-6 text-center">
                        <div className="w-32 h-32 rounded-full border mx-auto mb-4 flex items-center justify-center text-gray-400 overflow-hidden">
                            {photo ? (
                                <img 
                                    src={`http://localhost:5000${photo}`} 
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>📷</span>
                            )}
                        </div>

                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                        />
                        <button 
                            onClick={() => document.getElementById('photo-upload')?.click()}
                            disabled={uploading}
                            className="px-5 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition disabled:opacity-50"
                        >
                            {uploading ? 'Đang upload...' : 'Upload Photo'}
                        </button>
                    </div>

                    {/* STATS */}
                    <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-3 text-sm">
                        <Stat label="Profile Completion" value={`${profileViews}%`} />
                        <Stat label="Total Matches" value={totalMatches.toString()} />
                        <Stat label="Profile Views" value={profileViews.toString()} />
                        <Stat label="Avg Match Score" value={`${avgMatchScore}%`} />
                    </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="md:col-span-2 bg-white rounded-2xl border shadow-sm p-6 space-y-5">

                    <h2 className="font-semibold text-lg">
                        Basic Information
                    </h2>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
                        <Input 
                            label="Full Name" 
                            value={fullName} 
                            setValue={setFullName} 
                        />
                        <Input 
                            label="Email" 
                            value={email} 
                            setValue={setEmail} 
                            //disabled={true}
                        />

                        <Input 
                            label="Phone Number" 
                            value={phone} 
                            setValue={setPhone} 
                        />
                        <Input 
                            label="Address" 
                            value={address} 
                            setValue={setAddress} 
                        />

                        <Input 
                            label="University" 
                            value={university} 
                            setValue={setUniversity} 
                        />
                        <Input 
                            label="Major" 
                            value={major} 
                            setValue={setMajor} 
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button 
                            onClick={onViewDashboard}
                            className="px-5 py-2 rounded-xl border-2 border-slate-400 bg-slate-100 font-semibold text-slate-700 hover:bg-slate-200 transition"
                        >
                            Cancel
                        </button>

                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2 rounded-xl border-2 border-slate-400 bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            {saving ? 'Đang lưu...' : 'Save'}
                        </button>
                    </div>
>>>>>>> Stashed changes

                </div>

            </div>
        </div>
    );
}
<<<<<<< Updated upstream
=======

/* ===== SMALL COMPONENTS ===== */

function Input({ label, value, setValue, type = "text", disabled = false }) {
    return (
        <div>
            <label className="text-sm">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
                className={`w-full border rounded-lg p-2 mt-1 ${disabled ? 'bg-gray-100' : ''}`}
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
>>>>>>> Stashed changes
