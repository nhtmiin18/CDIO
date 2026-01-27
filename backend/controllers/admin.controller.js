const User = require("../models/User");
const Activity = require("../models/AdminActivity");
const Internship = require("../models/AppliedInternship");
const CV = require("../models/CV");
const InternshipPost = require("../models/InternshipPost");

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

/* ================= BLOCK ================= */

exports.toggleBlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.status = user.status === "blocked" ? "active" : "blocked";
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= DELETE ================= */

exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* ================= USER ISSUES ================= */

exports.getUserIssues = async (req, res) => {
    try {
        const noName = await User.countDocuments({
            $or: [{ name: null }, { name: "" }]
        });

        const noRole = await User.countDocuments({
            $or: [{ role: null }, { role: "" }]
        });

        const blocked = await User.countDocuments({
            status: "blocked"
        });

        res.json({
            noName,
            noRole,
            blocked
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* ================= SYSTEM REPORT ================= */

exports.getSystemReport = async (req, res) => {
    try {
        const totalCV = await CV.countDocuments();

        const parsedSuccess = await CV.countDocuments({ parsed: true });
        const parsedFailed = await CV.countDocuments({ parsed: false });

        const noSkills = await CV.countDocuments({
            $or: [{ skills: { $size: 0 } }, { skills: { $exists: false } }]
        });

        const noPhone = await CV.countDocuments({
            $or: [{ phone: null }, { phone: "" }]
        });

        const noEmail = await CV.countDocuments({
            $or: [{ email: null }, { email: "" }]
        });

        res.json({
            totalCV,
            parsedSuccess,
            parsedFailed,
            noSkills,
            noPhone,
            noEmail
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* =============== INTERNSHIP POSTS =============== */
exports.getInternshipPostStats = async (req, res) => {
    try {

        const posts = await InternshipPost.find();

        const total = posts.length;

        const active = posts.filter(p => p.status === "PUBLISHED").length;
        const paused = posts.filter(p => p.status === "PAUSED").length;
        const expired = posts.filter(p => p.status === "EXPIRED").length;
        const draft = posts.filter(p => p.status === "DRAFT").length;

        res.json({
            total,
            active,
            paused,
            expired,
            draft
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInternshipPosts = async (req, res) => {
    try {
        const posts = await InternshipPost.find().sort({ createdAt: -1 });
        res.json(posts); 
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/* ===== UPDATE POST STATUS ===== */

exports.updatePostStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const post = await InternshipPost.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json(post);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

