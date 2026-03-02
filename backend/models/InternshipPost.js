const mongoose = require("mongoose");

const internshipPostSchema = new mongoose.Schema(
    {
        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        title: String,
        companyName: String,
        location: String,
        internshipType: String,
        workMode: String,
        duration: String,
        monthlyStipend: Number,
        description: String,

        // ✅ SỬA LẠI STRUCTURE SKILLS CHO ĐÚNG
        skills: {
            programmingLanguages: {
                type: [String],
                default: [],
            },
            frameworks: {
                type: [String],
                default: [],
            },
            tools: {
                type: [String],
                default: [],
            },
        },

        minimumGPA: {
            type: Number,
            default: 0,
        },

        major: String,

        languageRequirements: {
            type: [String],
            default: [],
        },

        otherRequirements: String,

        experienceLevel: {
            type: String,
            default: "NO_EXPERIENCE",
        },

        experienceDescription: String,

        benefits: {
            type: [String],
            default: [],
        },

        certifications: {
            type: [String],
            default: [],
        },

        status: {
            type: String,
            default: "DRAFT",
        },
    },
    {
        timestamps: true,
        collection: "posts",
    }
);

module.exports = mongoose.model("InternshipPost", internshipPostSchema);