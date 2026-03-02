const mongoose = require("mongoose");

const postScoreSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InternshipPost",
        required: true,
    },

    score: {
        type: Number,
        required: true,
    },

    skillScore: {
        type: Number,
        default: 0,
    },

    majorScore: {
        type: Number,
        default: 0,
    },

    experienceScore: {
        type: Number,
        default: 0,
    },

    gpaScore: {
        type: Number,
        default: 0,
    },
});

const parsedCVSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        profileScore: {
            type: Number,
            default: 0,
        },

        posts: [postScoreSchema], 
    },
    { timestamps: true }
);

module.exports = mongoose.model("ParsedCV", parsedCVSchema);