const Company = require("../src/models/Company");
const express = require("express");
const router = express.Router();
const InternshipPost = require("../src/models/InternshipPost");

/**
 * GET all internship posts
 */
router.get("/", async (req, res) => {
    try {
        const posts = await InternshipPost
            .find()
            .populate("company");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * CREATE internship post
 */
router.post("/", async (req, res) => {
    try {
        const post = new InternshipPost(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * DELETE internship post
 */
router.delete("/:id", async (req, res) => {
    try {
        await InternshipPost.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await InternshipPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,        // trả về dữ liệu SAU khi update
                runValidators: true
            }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
// UPDATE internship post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = await InternshipPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("company");

        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});