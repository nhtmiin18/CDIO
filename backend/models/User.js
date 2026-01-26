const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,

    status: {
        type: String,
        enum: ["active", "blocked"],
        default: "active"
    },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);