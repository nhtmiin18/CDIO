const express = require("express");
const router = express.Router();
const CV = require("../models/CV");

// Lấy CV theo userId
router.get("/user/:userId", async (req, res) => {
    try {
        const cv = await CV.findOne({ userId: req.params.userId });

        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json(cv);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
router.get("/parsed/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const parsed = await ParsedCV.findById(userId);

        if (!parsed) {
            return res.status(404).json({ message: "Parsed CV not found" });
        }

        res.json(parsed);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;