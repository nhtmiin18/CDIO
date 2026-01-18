import {
    Search,
    Download,
    Filter,
    ChevronLeft,
    ChevronRight,
    Bell,
    User,
    AlertTriangle
} from 'lucide-react';

const InternshipPostManagement = () => {
    const stats = [
        { label: 'Total Posts', value: '450', color: 'border-l-4 border-gray-800' },
        { label: 'Active', value: '234', color: 'border-l-4 border-green-500 bg-green-50' },
        { label: 'Paused', value: '42', color: 'border-l-4 border-yellow-500 bg-yellow-50' },
        { label: 'Expired', value: '156', color: 'border-l-4 border-gray-400' },
        { label: 'Draft', value: '18', color: 'border-l-4 border-gray-200' }
    ];

    const posts = [
        { id: '#INT-2401', title: 'Frontend Developer Intern', mode: 'Remote', duration: '6 months', company: 'Tech Corp Inc.', status: 'Active', matches: 45, date: 'Jan 6, 2026', isFlagged: false },
        { id: '#INT-2400', title: 'Backend Developer Intern', mode: 'Hybrid', duration: '4 months', company: 'Global Solutions', status: 'Active', matches: 38, date: 'Jan 4, 2026', isFlagged: false },
        { id: '#INT-2399', title: 'Unpaid Internship', mode: 'On-site', duration: '6 months', company: 'Suspicious Corp', status: 'Under Review', matches: 12, date: 'Jan 3, 2026', isFlagged: true },
        { id: '#INT-2398', title: 'Mobile App Developer', mode: 'Remote', duration: '5 months', company: 'Innovation Labs', status: 'Paused', matches: 29, date: 'Jan 1, 2026', isFlagged: false },
        { id: '#INT-2397', title: 'Full Stack Developer', mode: 'On-site', duration: '6 months', company: 'StartUp Ventures', status: 'Active', matches: 52, date: 'Dec 28, 2025', isFlagged: false },
        { id: '#INT-2396', title: 'Data Science Intern', mode: 'Remote', duration: '3 months', company: 'Data Corp', status: 'Expired', matches: 67, date: 'Nov 15, 2025', isFlagged: false }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 text-slate-800">
            <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h1 className="text-xl font-bold">ISRS - Internship Post Management</h1>
                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <div className="flex items-center gap-2 border-l pl-4 border-gray-300">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={16} />
                        </div>
                        <span className="font-medium text-sm">Admin User</span>
                    </div>
                    <button className="text-sm border border-slate-300 px-3 py-1 rounded hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex gap-1 mb-6 border-b border-gray-300">
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Dashboard</button>
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">User Management</button>
                <button className="px-6 py-3 bg-black text-white font-medium rounded-t-lg">Internship Posts</button>
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Reports</button>
                <button className="px-6 py-3 text-gray-500 font-medium hover:text-black">Settings</button>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center ${stat.color}`}>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-xs text-gray-500 font-semibold uppercase">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3 space-y-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </h3>
                    </div>
                </div>

                <div className="col-span-9">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6 flex justify-between items-center">
                        <div className="relative w-2/3">
                            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search posts by title, company, or ID"
                                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                        <button className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50">
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipPostManagement;
