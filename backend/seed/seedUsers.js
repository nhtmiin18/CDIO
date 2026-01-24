const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.join(__dirname, "../.env"),
});

const User = require("../models/User");

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected (seed users)");

        await User.deleteMany();

        const users = [
            {
                name: "Admin ISRS",
                email: "admin@isrs.com",
                password: "123",
                role: "admin",
            },

            {
                name: "Student 1",
                email: "student1@isrs.com",
                password: "123",
                role: "student",
            },
            {
                name: "Student 2",
                email: "student2@isrs.com",
                password: "123",
                role: "student",
            },
            {
                name: "Student 3",
                email: "student3@isrs.com",
                password: "123",
                role: "student",
            },
            {
                name: "Student 4",
                email: "student4@isrs.com",
                password: "123",
                role: "student",
            },
            {
                name: "Student 5",
                email: "student5@isrs.com",
                password: "123",
                role: "student",
            },

            {
                name: "Recruiter 1",
                email: "recruiter1@isrs.com",
                password: "123",
                role: "recruiter",
            },
            {
                name: "Recruiter 2",
                email: "recruiter2@isrs.com",
                password: "123",
                role: "recruiter",
            },
            {
                name: "Recruiter 3",
                email: "recruiter3@isrs.com",
                password: "123",
                role: "recruiter",
            },
            {
                name: "Recruiter 4",
                email: "recruiter4@isrs.com",
                password: "123",
                role: "recruiter",
            },
            {
                name: "Recruiter 5",
                email: "recruiter5@isrs.com",
                password: "123",
                role: "recruiter",
            },
        ];

        await User.insertMany(users); // ⭐ DÒNG QUAN TRỌNG

        console.log("✅ Users seeded successfully");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed users error:", err);
        process.exit(1);
    }
}

seed();
