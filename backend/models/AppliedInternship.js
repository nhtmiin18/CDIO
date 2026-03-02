const mongoose = require("mongoose");

const appliedSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    cvId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CV"
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternshipPost"
    },

    skillScore: Number,
    experienceScore: Number,
    educationScore: Number,

    matchScore: Number
}, { timestamps: true });

module.exports = mongoose.model("AppliedInternship", appliedSchema);
