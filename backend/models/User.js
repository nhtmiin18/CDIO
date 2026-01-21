const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String },
        role: {
            type: String,
            enum: ["admin", "student", "recruiter"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
