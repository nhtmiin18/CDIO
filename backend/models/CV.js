const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        major: {
            type: String,
            required: true,
        },

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

        experiences: {
            type: Number, 
            min: 0,
            default: 0,
        },

        GPA: {
            type: Number,
            min: 0,
            max: 4,
            required: true,
        },

        parsed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "cv",
    }
);

module.exports = mongoose.model("CV", cvSchema);