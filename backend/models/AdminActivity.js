const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    message: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Activity", ActivitySchema);
