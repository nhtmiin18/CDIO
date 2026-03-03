const express = require("express");
const router = express.Router();

const InternshipPost = require("../models/InternshipPost");

// GET ALL PUBLISHED POSTS
router.get("/", async (req, res) => {
    try {
        const posts = await InternshipPost.find({ status: "PUBLISHED" })
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        console.error("GET POSTS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;