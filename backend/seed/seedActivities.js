require("dotenv").config({ path: "../.env" });
mongoose.connect(process.env.MONGO_URI);
const mongoose = require("mongoose");
const Activity = require("../models/AdminActivity");

async function seedActivities() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected (seedActivities)");

        // ❌ Xóa activity cũ
        await Activity.deleteMany();

        const activities = [
            { message: "Admin created a new internship post" },
            { message: "Student uploaded CV" },
            { message: "Recruiter approved internship application" },
            { message: "CV parsing completed successfully" },
            { message: "New recruiter account registered" },
        ];

        await Activity.insertMany(activities);

        console.log("✅ Seed ACTIVITIES success:", activities.length);
        process.exit();
    } catch (err) {
        console.error("❌ Seed ACTIVITIES failed:", err);
        process.exit(1);
    }
}

seedActivities();
