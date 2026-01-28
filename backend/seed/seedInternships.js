require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");

const Internship = require("../models/AppliedInternship");

async function seedInternships() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");

        await Internship.deleteMany();

        await Internship.insertMany([
            { title: "Frontend Intern", appliedCount: 5 },
            { title: "Backend Intern", appliedCount: 4 },
            { title: "AI Intern", appliedCount: 5 },
            { title: "Data Analyst Intern", appliedCount: 2 },
        ]);

        console.log("✅ Internships seeded successfully");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seeding error:", err);
        process.exit(1);
    }
}

seedInternships();
