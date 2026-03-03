const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fullName: String,
    major: String,
    skills: {
        programmingLanguages: [String],
        frameworks: [String],
        tools: [String]
    },
    experiences: Number,
    GPA: Number
}, { timestamps: true });

module.exports = mongoose.model("CV", cvSchema, "cv");