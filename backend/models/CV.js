const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    fullName: String,
    email: String,
    phone: String,
    title: String,
    summary: String,
    location: String,

    skills: Array,
    education: Array,
    experience: Array,

    parsed: {
        type: Boolean,
        default: true
    },

    cvFileUrl: String

}, { timestamps: true });

module.exports = mongoose.model("CV", cvSchema, "cv");
