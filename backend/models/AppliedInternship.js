const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        appliedCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Internship", InternshipSchema);
