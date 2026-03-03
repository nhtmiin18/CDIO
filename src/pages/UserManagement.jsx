import React from 'react';
import { Search, Plus, Download, Filter, ChevronLeft, ChevronRight, Bell, User } from 'lucide-react';

const UserManagement = () => {
    const users = [
        { id: '#U1001', name: 'Alice Johnson', email: 'alice.j@email.com', type: 'Student', status: 'Active', date: 'Jan 5, 2026' },
        { id: '#U1002', name: 'Jane Smith', email: 'jane.s@techcorp.com', type: 'Recruiter', status: 'Active', date: 'Jan 3, 2026' },
        { id: '#U1003', name: 'Bob Williams', email: 'bob.w@email.com', type: 'Student', status: 'Active', date: 'Jan 2, 2026' },
        { id: '#U1004', name: 'Carol Davis', email: 'carol.d@email.com', type: 'Student', status: 'Pending', date: 'Jan 1, 2026' },
        { id: '#U1005', name: 'Spam Account', email: 'spam@fake.com', type: 'Recruiter', status: 'Suspended', date: 'Dec 28, 2025' },
        { id: '#U1006', name: 'David Miller', email: 'david.m@email.com', type: 'Student', status: 'Active', date: 'Dec 20, 2025' },
        { id: '#U1007', name: 'Emma Wilson', email: 'emma.w@company.com', type: 'Recruiter', status: 'Active', date: 'Dec 18, 2025' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 font-sans text-slate-800">
            <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold">ISRS - User Management</h1>
                </div>
                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <div className="flex items-center gap-2 border-l pl-4 border-gray-300">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><User size={16} /></div>
                        <span className="font-medium text-sm">Admin User</span>
                    </div>
                    <button className="text-sm border border-slate-300 px-3 py-1 rounded hover:bg-gray-100">Logout</button>
                </div>
            </header>

            <div className="flex gap-1 mb-6 border-b border-gray-300">
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Dashboard</button>
                <button className="px-6 py-3 bg-black text-white font-medium rounded-t-lg">User Management</button>
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Internship Posts</button>
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Reports</button>
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Settings</button>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 space-y-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Filter size={18} /> Filters</h3>

                        <div className="mb-4">
                            <h4 className="font-semibold text-sm mb-2">User Type</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /> All (1,247)</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Students (856)</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Recruiters (391)</label>
                            </div>
                        </div>

                        <div className="mb-4 border-t pt-4 border-gray-100">
                            <h4 className="font-semibold text-sm mb-2">Status</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /> Active</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Inactive</label>
                                <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Suspended</label>
                            </div>
                        </div>

                        <div className="mb-6 border-t pt-4 border-gray-100">
                            <h4 className="font-semibold text-sm mb-2">Registration Date</h4>
                            <input type="text" placeholder="Enter from" className="w-full text-sm p-2 border border-gray-300 rounded mb-2" />
                            <input type="text" placeholder="Enter to" className="w-full text-sm p-2 border border-gray-300 rounded" />
                        </div>

                        <button className="w-full bg-black text-white py-2 rounded text-sm font-medium mb-2 hover:bg-gray-800">APPLY FILTERS</button>
                        <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50">CLEAR</button>
                    </div>

                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-sm mb-3">Bulk Actions</h3>
                        <div className="space-y-2">
                            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-xs font-semibold hover:bg-gray-50 uppercase">Export Selected</button>
                            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-xs font-semibold hover:bg-gray-50 uppercase">Send Message</button>
                            <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded text-xs font-semibold hover:bg-gray-50 uppercase">Suspend Selected</button>
                        </div>
                    </div>
                </div>

                <div className="col-span-9">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex justify-between items-center">
                        <div className="flex gap-2 w-1/2">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                                <input type="text" placeholder="Search users by name, email, or ID" className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-black" />
                            </div>
                            <button className="bg-black text-white px-4 py-2 rounded text-sm font-bold">SEARCH</button>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1 bg-white border border-gray-300 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50 uppercase"><Plus size={16} /> Add User</button>
                            <button className="flex items-center gap-1 bg-white border border-gray-300 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50 uppercase"><Download size={16} /> Export All</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-bold text-lg">All Users (1,247)</h3>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
                                <tr>
                                    <th className="p-4 w-10"><input type="checkbox" /></th>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Registered</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {users.map((user, idx) => (
                                    <tr key={idx} className={`border-b border-gray-100 hover:bg-gray-50 ${user.status === 'Suspended' ? 'bg-red-50' : ''}`}>
                                        <td className="p-4"><input type="checkbox" /></td>
                                        <td className="p-4 font-medium text-gray-600">{user.id}</td>
                                        <td className="p-4 font-semibold flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">{user.name.charAt(0)}</div>
                                            {user.name}
                                        </td>
                                        <td className="p-4 text-gray-600">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded border text-xs font-semibold 
                                        ${user.type === 'Student' ? 'bg-white border-gray-300 text-gray-700' : 'bg-white border-gray-300 text-gray-700'}`}>
                                                {user.type}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`flex items-center gap-1 text-xs font-bold
                                        ${user.status === 'Active' ? 'text-green-600' :
                                                    user.status === 'Pending' ? 'text-yellow-600' :
                                                        'text-red-600'}`}>
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-600' : user.status === 'Pending' ? 'bg-yellow-600' : 'bg-red-600'}`}></span>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500">{user.date}</td>
                                        <td className="p-4 flex gap-2 justify-center">
                                            <button className="border border-gray-300 px-2 py-1 rounded text-xs font-semibold hover:bg-gray-100">VIEW</button>
                                            <button className="border border-gray-300 px-2 py-1 rounded text-xs font-semibold hover:bg-gray-100">EDIT</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="p-4 border-t border-gray-200 flex justify-between items-center text-sm">
                            <span className="text-gray-500">Showing 1-10 of 1,247 users</span>
                            <div className="flex gap-1">
                                <button className="px-3 py-1 border rounded hover:bg-gray-100 flex items-center gap-1"><ChevronLeft size={14} /> PREV</button>
                                <button className="px-3 py-1 border bg-black text-white rounded">1</button>
                                <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
                                <button className="px-3 py-1 border rounded hover:bg-gray-100">3</button>
                                <span className="px-2 py-1">...</span>
                                <button className="px-3 py-1 border rounded hover:bg-gray-100">125</button>
                                <button className="px-3 py-1 border rounded hover:bg-gray-100 flex items-center gap-1">NEXT <ChevronRight size={14} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;