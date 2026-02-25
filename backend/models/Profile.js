const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            trim: true,
            default: ""
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: ""
        },
        address: {
            type: String,
            trim: true,
            default: ""
        },
        university: {
            type: String,
            trim: true,
            default: ""
        },
        major: {
            type: String,
            trim: true,
            default: ""
        },
        photo: {
            type: String,
            default: null
        },
        profileViews: {
            type: Number,
            default: 48
        },
        avgMatchScore: {
            type: Number,
            default: 84
        },
        totalMatches: {
            type: Number,
            default: 75
        }
    },
    { timestamps: true }
);

// XÓA HOÀN TOÀN MIDDLEWARE
// Không có pre('save') nào ở đây

module.exports = mongoose.model("Profile", profileSchema);