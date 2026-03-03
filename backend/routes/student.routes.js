const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const CV = require("../models/CV");
const Post = require("../models/InternshipPost");
const User = require("../models/User");
const { upload } = require("../middleware/upload");
/*
========================================
GET STUDENT PROFILE
GET /api/students/:userId
========================================
*/
router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        // ❗ Không trả password
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


/*
========================================
UPDATE STUDENT PROFILE
PUT /api/students/:userId
========================================
*/
router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const {
            fullName,
            email,
            university,
            major,
            phone,
            address
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                email,
                university,
                major,
                phone,
                address
            },
            { new: true }
        ).select("-password"); // ❗ Không trả password

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


/*
========================================
GET PARSE RESULT
GET /api/students/parse/:userId
========================================
*/
router.get("/parse/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user id" });
        }

        const cv = await CV.findById(userId);

        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }

        const posts = await Post.find({ status: "PUBLISHED" });

        const normalize = (str) =>
            str?.toString().toLowerCase().trim();

        const postResults = [];

        for (let post of posts) {

            const cvSkills = [
                ...(cv.skills?.programmingLanguages || []),
                ...(cv.skills?.frameworks || []),
                ...(cv.skills?.tools || [])
            ].map(normalize);

            const postSkills = [
                ...(post.skills?.programmingLanguages || []),
                ...(post.skills?.frameworks || []),
                ...(post.skills?.tools || [])
            ].map(normalize);

            let skillScore = 0;

            if (postSkills.length > 0) {
                const matched = postSkills.filter(skill =>
                    cvSkills.includes(skill)
                );

                skillScore =
                    (matched.length / postSkills.length) * 100;
            }

            const experienceScore = 100;

            let majorScore = 0;
            if (post.major && cv.major) {
                if (normalize(post.major) === normalize(cv.major)) {
                    majorScore = 100;
                }
            }

            let gpaScore = 0;
            if (post.minimumGPA) {
                gpaScore =
                    cv.GPA >= post.minimumGPA ? 100 : 0;
            }

            const score =
                (skillScore +
                    experienceScore +
                    majorScore +
                    gpaScore) / 4;

            postResults.push({
                postId: post._id,
                title: post.title,
                companyName: post.companyName,
                score: Math.round(score),
                skillScore: Math.round(skillScore),
                majorScore,
                experienceScore,
                gpaScore,
            });
        }

        const totalScore = postResults.reduce(
            (sum, p) => sum + p.score,
            0
        );

        const profileScore =
            postResults.length > 0
                ? totalScore / postResults.length
                : 0;

        res.json({
            profileScore: Math.round(profileScore),
            posts: postResults,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/:id/photo", upload.single("photo"), async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Not found" });
        }

        student.photo = req.file.path;
        await student.save();

        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;