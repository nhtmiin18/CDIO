const mongoose = require("mongoose");

const CVSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fullName: {
            type: String,
            required: true,
        },

        email: String,
        phone: String,

        title: String,
        summary: String,
        location: String,

        skills: [String],

        education: [
            {
                school: String,
                degree: String,
                field: String,
                startYear: String,
                endYear: String,
            },
        ],

        experience: [
            {
                company: String,
                position: String,
                startDate: String,
                endDate: String,
                description: String,
            },
        ],

        cvFileUrl: String,
    },
    {
        timestamps: true, // createdAt + updatedAt
    }
);

module.exports = mongoose.model("CV", CVSchema, "cv");
