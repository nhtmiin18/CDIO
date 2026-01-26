const User = require("../models/User");
const Activity = require("../models/AdminActivity");
const Internship = require("../models/AppliedInternship");
const CV = require("../models/CV");

/* ================= OVERVIEW ================= */

exports.getOverview = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });

        const students = await User.countDocuments({ role: "student" });
        const recruiters = await User.countDocuments({ role: "recruiter" });
        const cvParsed = await CV.countDocuments();

        res.json({
            totalUsers,
            students,
            recruiters,
            cvParsed
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= ACTIVITIES ================= */

exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= TOP INTERNSHIPS ================= */

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

/* ================= USAGE ================= */

exports.getUsage = async (req, res) => {
    try {
        const data = await User.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    users: { $sum: 1 }
                }
            }
        ]);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const mapped = days.map((d, i) => {
            const found = data.find(x => x._id === i + 1);
            return {
                day: d,
                users: found ? found.users : 0
            };
        });

        res.json(mapped);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= USERS ================= */

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } }).lean();

        const mapped = users.map(u => ({
            _id: u._id,
            role: u.role,
            status: u.status || "active",
            name: u.name || u.fullName || u.hrName || u.email
        }));

        res.json(mapped);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* ================= BLOCK / UNBLOCK ================= */

exports.toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        user.status = user.status === "blocked" ? "active" : "blocked";

        await user.save();

        res.json(user);
    } catch {
        res.status(500).json({ message: "Block failed" });
    }
};


/* ================= DELETE USER ================= */

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
