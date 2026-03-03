const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // ===== COMMON =====
        role: {
            type: String,
            enum: ["student", "recruiter", "admin"],
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        // ===== STUDENT =====
        fullName: String,
        phone: String,
        cvFileUrl: String,
        address: String,
        major: String,
        university: String,
        gpa: Number,

        skills: {
            programmingLanguages: [String],
            frameworks: [String],
            tools: [String],
        },

        // ===== RECRUITER =====
        companyName: String,
        companyWebsite: String,
        hrName: String,
    },
    {
        timestamps: true, // tạo createdAt & updatedAt giống doc bạn gửi
    }
);

module.exports = mongoose.model("User", userSchema);