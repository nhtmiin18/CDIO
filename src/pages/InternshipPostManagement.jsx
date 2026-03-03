//import React from 'react';
//import { Search, Download, Filter, ChevronLeft, ChevronRight, Bell, User, AlertTriangle, Eye, Edit, Archive, Ban } from 'lucide-react';

//const InternshipPostManagement = () => {
//    const stats = [
//        { label: 'Total Posts', value: '450', color: 'border-l-4 border-gray-800' },
//        { label: 'Active', value: '234', color: 'border-l-4 border-green-500 bg-green-50' },
//        { label: 'Paused', value: '42', color: 'border-l-4 border-yellow-500 bg-yellow-50' },
//        { label: 'Expired', value: '156', color: 'border-l-4 border-gray-400' },
//        { label: 'Draft', value: '18', color: 'border-l-4 border-gray-200' },
//    ];

//    const posts = [
//        { id: '#INT-2401', title: 'Frontend Developer Intern', mode: 'Remote', duration: '6 months', company: 'Tech Corp Inc.', status: 'Active', matches: 45, date: 'Jan 6, 2026', isFlagged: false },
//        { id: '#INT-2400', title: 'Backend Developer Intern', mode: 'Hybrid', duration: '4 months', company: 'Global Solutions', status: 'Active', matches: 38, date: 'Jan 4, 2026', isFlagged: false },
//        { id: '#INT-2399', title: 'Unpaid Internship', mode: 'On-site', duration: '6 months', company: 'Suspicious Corp', status: 'Under Review', matches: 12, date: 'Jan 3, 2026', isFlagged: true },
//        { id: '#INT-2398', title: 'Mobile App Developer', mode: 'Remote', duration: '5 months', company: 'Innovation Labs', status: 'Paused', matches: 29, date: 'Jan 1, 2026', isFlagged: false },
//        { id: '#INT-2397', title: 'Full Stack Developer', mode: 'On-site', duration: '6 months', company: 'StartUp Ventures', status: 'Active', matches: 52, date: 'Dec 28, 2025', isFlagged: false },
//        { id: '#INT-2396', title: 'Data Science Intern', mode: 'Remote', duration: '3 months', company: 'Data Corp', status: 'Expired', matches: 67, date: 'Nov 15, 2025', isFlagged: false },
//    ];

//    return (
//        <div className="min-h-screen bg-gray-50 p-6 font-sans text-slate-800">
//            {/* --- HEADER --- */}
//            <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                <div className="flex items-center gap-3">
//                    <h1 className="text-xl font-bold">ISRS - Internship Post Management</h1>
//                </div>
//                <div className="flex items-center gap-4">
//                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
//                    <div className="flex items-center gap-2 border-l pl-4 border-gray-300">
//                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><User size={16} /></div>
//                        <span className="font-medium text-sm">Admin User</span>
//                    </div>
//                    <button className="text-sm border border-slate-300 px-3 py-1 rounded hover:bg-gray-100">Logout</button>
//                </div>
//            </header>

//            {/* --- NAVIGATION TABS --- */}
//            <div className="flex gap-1 mb-6 border-b border-gray-300">
//                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Dashboard</button>
//                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">User Management</button>
//                <button className="px-6 py-3 bg-black text-white font-medium rounded-t-lg">Internship Posts</button>
//                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Reports</button>
//                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Settings</button>
//            </div>

//            {/* --- STATS CARDS --- */}
//            <div className="grid grid-cols-5 gap-4 mb-6">
//                {stats.map((stat, idx) => (
//                    <div key={idx} className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center ${stat.color}`}>
//                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
//                        <div className="text-xs text-gray-500 font-semibold uppercase">{stat.label}</div>
//                    </div>
//                ))}
//            </div>

//            <div className="grid grid-cols-12 gap-6">
//                {/* --- LEFT SIDEBAR (FILTERS) --- */}
//                <div className="col-span-3 space-y-6">
//                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
//                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Filter size={18} /> Filters</h3>

//                        {/* Status Filter */}
//                        <div className="mb-4">
//                            <h4 className="font-semibold text-sm mb-2">Status</h4>
//                            <div className="space-y-2 text-sm text-gray-700">
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /> All (450)</label>
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Active (234)</label>
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Paused (42)</label>
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Expired (156)</label>
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Draft (18)</label>
//                            </div>
//                        </div>

//                        {/* Work Mode Filter */}
//                        <div className="mb-4 border-t pt-4 border-gray-100">
//                            <h4 className="font-semibold text-sm mb-2">Work Mode</h4>
//                            <div className="space-y-2 text-sm text-gray-700">
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Remote</label>
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> On-site</label>
//                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Hybrid</label>
//                            </div>
//                        </div>

//                        {/* Date Filter */}
//                        <div className="mb-4 border-t pt-4 border-gray-100">
//                            <h4 className="font-semibold text-sm mb-2">Posted Date</h4>
//                            <input type="text" placeholder="Enter from" className="w-full text-sm p-2 border border-gray-300 rounded mb-2" />
//                            <input type="text" placeholder="Enter to" className="w-full text-sm p-2 border border-gray-300 rounded" />
//                        </div>

//                        {/* Flagged Filter */}
//                        <div className="mb-6 border-t pt-4 border-gray-100">
//                            <h4 className="font-semibold text-sm mb-2">Flagged</h4>
//                            <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" className="rounded" /> Show only flagged</label>
//                        </div>

//                        <button className="w-full bg-black text-white py-2 rounded text-sm font-medium mb-2 hover:bg-gray-800">APPLY FILTERS</button>
//                        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50">CLEAR</button>
//                    </div>

//                    {/* FLAGGED POSTS ALERT */}
//                    <div className="bg-white p-5 rounded-lg border border-red-200 shadow-sm">
//                        <h3 className="font-bold text-sm mb-2">Flagged Posts</h3>
//                        <div className="text-center py-2">
//                            <div className="text-3xl font-bold text-red-600 mb-1">3</div>
//                            <div className="text-xs text-gray-500 mb-3">Require Review</div>
//                            <button className="w-full bg-black text-white py-2 rounded text-xs font-bold hover:bg-gray-800">REVIEW NOW</button>
//                        </div>
//                    </div>
//                </div>

//                {/* --- MAIN CONTENT (TABLE) --- */}
//                <div className="col-span-9">
//                    {/* Search Bar */}
//                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex justify-between items-center">
//                        <div className="flex gap-2 w-2/3">
//                            <div className="relative w-full">
//                                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
//                                <input type="text" placeholder="Search posts by title, company, or ID" className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black" />
//                            </div>
//                            <button className="bg-black text-white px-6 py-2 rounded text-sm font-bold">SEARCH</button>
//                        </div>
//                        <button className="flex items-center gap-1 bg-white border border-gray-300 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50 uppercase"><Download size={16} /> Export</button>
//                    </div>

//                    {/* Table */}
//                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//                        <div className="p-4 border-b border-gray-200">
//                            <h3 className="font-bold text-lg">All Internship Posts (450)</h3>
//                        </div>

//                        <table className="w-full text-left border-collapse">
//                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
//                                <tr>
//                                    <th className="p-4 w-10"><input type="checkbox" /></th>
//                                    <th className="p-4">ID</th>
//                                    <th className="p-4">Title</th>
//                                    <th className="p-4">Company</th>
//                                    <th className="p-4">Status</th>
//                                    <th className="p-4">Matches</th>
//                                    <th className="p-4">Posted</th>
//                                    <th className="p-4 text-center">Actions</th>
//                                </tr>
//                            </thead>
//                            <tbody className="text-sm">
//                                {posts.map((post, idx) => (
//                                    <tr key={idx} className={`border-b border-gray-100 hover:bg-gray-50 ${post.isFlagged ? 'bg-red-50 hover:bg-red-100' : ''}`}>
//                                        <td className="p-4"><input type="checkbox" /></td>
//                                        <td className="p-4 font-medium text-gray-600">{post.id}</td>
//                                        <td className="p-4">
//                                            <div className="font-bold text-slate-800">{post.title}</div>
//                                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
//                                                <span>{post.mode}</span> • <span>{post.duration}</span>
//                                                {post.isFlagged && <span className="text-red-600 font-bold flex items-center gap-1"><AlertTriangle size={12} /> FLAGGED</span>}
//                                            </div>
//                                        </td>
//                                        <td className="p-4 text-gray-700 font-medium">{post.company}</td>
//                                        <td className="p-4">
//                                            <span className={`flex items-center gap-1 text-xs font-bold
//                                        ${post.status === 'Active' ? 'text-green-600' :
//                                                    post.status === 'Paused' ? 'text-yellow-600' :
//                                                        post.status === 'Under Review' ? 'text-orange-600' :
//                                                            'text-gray-500'}`}>
//                                                <span className={`w-2 h-2 rounded-full ${post.status === 'Active' ? 'bg-green-600' :
//                                                        post.status === 'Paused' ? 'bg-yellow-600' :
//                                                            post.status === 'Under Review' ? 'bg-orange-600' :
//                                                                'bg-gray-500'}`}></span>
//                                                {post.status}
//                                            </span>
//                                        </td>
//                                        <td className="p-4 font-semibold">{post.matches}</td>
//                                        <td className="p-4 text-gray-500">{post.date}</td>
//                                        <td className="p-4 flex gap-2 justify-center">
//                                            {post.isFlagged ? (
//                                                <>
//                                                    <button className="bg-white border border-gray-300 px-2 py-1 rounded text-xs font-bold hover:bg-gray-100 text-gray-700">REVIEW</button>
//                                                    <button className="bg-white border border-red-200 text-red-600 px-2 py-1 rounded text-xs font-bold hover:bg-red-50">SUSPEND</button>
//                                                </>
//                                            ) : (
//                                                <>
//                                                    <button className="border border-gray-300 px-2 py-1 rounded text-xs font-semibold hover:bg-gray-100">VIEW</button>
//                                                    <button className="border border-gray-300 px-2 py-1 rounded text-xs font-semibold hover:bg-gray-100">EDIT</button>
//                                                </>
//                                            )}
//                                        </td>
//                                    </tr>
//                                ))}
//                            </tbody>
//                        </table>

//                        {/* Pagination */}
//                        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm">
//                            <span className="text-gray-500">Showing 1-10 of 450 posts</span>
//                            <div className="flex gap-1">
//                                <button className="px-3 py-1 border rounded hover:bg-gray-100 flex items-center gap-1"><ChevronLeft size={14} /> PREV</button>
//                                <button className="px-3 py-1 border bg-black text-white rounded">1</button>
//                                <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
//                                <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
//                                <span className="px-2 py-1">...</span>
//                                <button className="px-3 py-1 border rounded hover:bg-gray-100">45</button>
//                                <button className="px-3 py-1 border rounded hover:bg-gray-100 flex items-center gap-1">NEXT <ChevronRight size={14} /></button>
//                            </div>
//                        </div>
//                    </div>
//                </div>
//            </div>
//        </div>
//    );
//};

//export default InternshipPostManagement;

import React, { useEffect, useState } from "react";
import {
    Search, Download, Filter, ChevronLeft, ChevronRight,
    Bell, User, AlertTriangle
} from "lucide-react";

import {
    getAllInternshipPosts,
    updateInternshipPost,
    deleteInternshipPost
} from "../services/internshipPostService";

const InternshipPostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // ===== LOAD DATA =====
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const data = await getAllInternshipPosts();
            setPosts(data);
        } catch (err) {
            console.error("Load posts error:", err);
            alert("Không tải được danh sách bài đăng");
        } finally {
            setLoading(false);
        }
    };

    // ===== UPDATE =====
    const handleUpdate = async (id) => {
        const updatedData = {
            title: "Frontend Intern UPDATED",
            description: "Updated from Frontend",
            slots: 10
        };

        try {
            await updateInternshipPost(id, updatedData);
            alert("Cập nhật thành công");
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert("Cập nhật thất bại");
        }
    };

    // ===== DELETE =====
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa post này?")) return;

        try {
            await deleteInternshipPost(id);
            alert("Xóa thành công");
            fetchPosts();
        } catch (err) {
            console.error(err);
            alert("Xóa thất bại");
        }
    };

    if (loading) {
        return <div className="p-6">Loading data...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-slate-800">
            {/* HEADER */}
            <header className="flex justify-between items-center mb-6 bg-white p-4 rounded shadow">
                <h1 className="text-xl font-bold">Internship Post Management</h1>
                <div className="flex items-center gap-3">
                    <Bell />
                    <User />
                </div>
            </header>

            {/* TABLE */}
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Company</th>
                            <th className="p-3">Slots</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post._id} className="border-b">
                                <td className="p-3 font-semibold">
                                    {post.title}
                                    {post.isFlagged && (
                                        <span className="text-red-600 ml-2 text-xs flex items-center gap-1">
                                            <AlertTriangle size={12} /> FLAGGED
                                        </span>
                                    )}
                                </td>
                                <td className="p-3">
                                    {post.company?.name || "N/A"}
                                </td>
                                <td className="p-3">{post.slots}</td>
                                <td className="p-3">{post.status || "Active"}</td>
                                <td className="p-3 flex gap-2 justify-center">
                                    <button
                                        onClick={() => handleUpdate(post._id)}
                                        className="px-3 py-1 border rounded hover:bg-gray-100"
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50"
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {posts.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        Không có internship post nào
                    </div>
                )}
            </div>
        </div>
    );
};

export default InternshipPostManagement;