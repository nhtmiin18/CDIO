import { ChevronLeft } from "lucide-react";

const JobInfoBar = () => {
    return (
        <div className="bg-white border-2 border-black p-5 mb-6 flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div>
                <h2 className="text-2xl font-bold">Frontend Developer Intern</h2>
                <p className="text-gray-500 text-sm mt-1">
                    45 matched students • Posted 3 days ago
                </p>
            </div>

            <div className="flex gap-3">
                <button className="px-5 py-2 border-2 border-black flex items-center gap-2 font-bold text-sm">
                    <ChevronLeft size={16} /> BACK TO POST
                </button>
                <button className="px-5 py-2 border-2 border-black font-bold text-sm">
                    VIEW SHORTLISTED (8)
                </button>
            </div>
        </div>
    );
};

export default JobInfoBar;
