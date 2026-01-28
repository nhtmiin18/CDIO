const mongoose = require("mongoose");

const internshipPostSchema = new mongoose.Schema({
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    companyName: String,
    location: String,
    internshipType: String,
    workMode: String,
    duration: String,
    skills: Object,
    benefits: Array,
    certifications: Array,
    status: {
        type: String,
        default: "DRAFT"
    }
}, { timestamps: true });

module.exports = mongoose.model("InternshipPost", internshipPostSchema, "posts");
