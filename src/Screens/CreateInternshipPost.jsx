import { useState } from "react";
import axios from "axios";
import { AppHeader } from "../components/AppHeader";
import { getUnreadCount } from "../components/notificationsHelper";

const API = "http://localhost:5000/api/recruiter";

function CreateInternshipPost({
    onBackDashboard,
    onLogout,
    onClickNotification,
}) {
    const unreadCount = getUnreadCount();

    const [title, setTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("");

    const [benefits, setBenefits] = useState([]);
    const [benefitInput, setBenefitInput] = useState("");

    /* ================= BENEFITS ================= */

    const addBenefit = () => {
        if (benefitInput.trim()) {
            setBenefits([...benefits, benefitInput.trim()]);
            setBenefitInput("");
        }
    };

    const removeBenefit = index => {
        setBenefits(benefits.filter((_, i) => i !== index));
    };

    /* ================= SUBMIT ================= */

    const publishPost = async () => {
        if (!title || !companyName) {
            alert("Title + Company required");
            return;
        }

        try {
            await axios.post(`${API}/internship-posts`, {
                title,
                companyName,
                description,
                benefits,
                status: "PUBLISHED"
            });

            alert("Post created");

            onBackDashboard();

        } catch (err) {
            console.error(err);
            alert("Create failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <AppHeader
                title="Create Internship Post"
                onClickNotification={onClickNotification}
                notificationCount={unreadCount}
                showBack={true}
                onBack={onBackDashboard}
                onLogout={onLogout}
            />

            <div className="max-w-3xl mx-auto p-8">

                <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">

                    <h2 className="text-xl font-semibold">
                        New Internship Post
                    </h2>

                    {/* TITLE */}
                    <div>
                        <label>Internship Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    {/* COMPANY */}
                    <div>
                        <label>Company Name</label>
                        <input
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            rows={4}
                        />
                    </div>

                    {/* BENEFITS */}
                    <div>
                        <label>Benefits</label>

                        <div className="flex flex-wrap gap-2 my-2">
                            {benefits.map((b, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-slate-100 rounded-full text-sm flex items-center gap-2"
                                >
                                    {b}
                                    <button
                                        onClick={() => removeBenefit(i)}
                                        className="text-red-400"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                value={benefitInput}
                                onChange={e => setBenefitInput(e.target.value)}
                                className="border rounded-lg p-2 flex-1"
                            />

                            <button
                                onClick={addBenefit}
                                className="px-4 border rounded-lg hover:bg-slate-50"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <button
                        onClick={publishPost}
                        className="px-6 py-2 rounded-xl bg-black text-white w-full"
                    >
                        Publish Post
                    </button>

                </div>
            </div>
        </div>
    );
}

export default CreateInternshipPost;
