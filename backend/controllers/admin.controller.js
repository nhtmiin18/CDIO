const User = require("../models/User");
const Activity = require("../models/AdminActivity");
const Internship = require("../models/AppliedInternship");

/* =====================================================
   DASHBOARD OVERVIEW
===================================================== */
exports.getOverview = async (req, res) => {
    try {
        const [totalUsers, students, recruiters, cvParsed] =
            await Promise.all([
                User.countDocuments(),
                User.countDocuments({ role: "student" }),
                User.countDocuments({ role: "recruiter" }),
                AdminActivity.countDocuments({ type: "CV_PARSED" }),
            ]);

        res.json({
            totalUsers,
            students,
            recruiters,
            cvParsed,
        });
    } catch (err) {
        res.status(500).json({ message: "Overview error" });
    }
};

/* =====================================================
   RECENT ACTIVITIES
===================================================== */
exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: "Activities error" });
    }
};

/* =====================================================
   TOP INTERNSHIPS
===================================================== */
exports.getTopInternships = async (req, res) => {
    try {
        const data = await Internship.find()
            .sort({ appliedCount: -1 })
            .limit(5)
            .select("title appliedCount");

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* =====================================================
   USAGE (MOCK)
===================================================== */
exports.getUsage = async (req, res) => {
    res.json([
        { day: "Mon", users: 2 },
        { day: "Tue", users: 3 },
        { day: "Wed", users: 1 },
        { day: "Thu", users: 4 },
        { day: "Fri", users: 1 },
    ]);
};
