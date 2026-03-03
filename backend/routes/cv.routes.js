const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const CV = require("../models/CV");
const User = require("../models/User");

/*
========================================
MULTER CONFIG
========================================
*/

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
            cb(new Error("Only PDF files are allowed"));
        } else {
            cb(null, true);
        }
    }
});

/*
========================================
GET CV BY _id
GET /api/cv/:_id
========================================
*/

router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid _id" });
        }

        const cv = await CV.findById(_id);

        if (!cv) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json(cv);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/*
========================================
UPLOAD & PARSE CV
POST /api/cv/upload
========================================
*/

router.post("/upload", upload.single("cv"), async (req, res) => {
    try {

        const file = req.file;
        const { _id } = req.body;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            fs.unlinkSync(file.path);
            return res.status(400).json({ message: "Invalid user id" });
        }

        // ===== GET USER FROM DB =====
        const user = await User.findById(_id);

        if (!user) {
            fs.unlinkSync(file.path);
            return res.status(404).json({ message: "User not found" });
        }

        // ===== READ PDF =====
        const dataBuffer = fs.readFileSync(file.path);
        const data = await pdfParse(dataBuffer);
        const text = data.text;

        // ===== CHECK FULL NAME =====
        const lines = text.split("\n").filter(l => l.trim() !== "");
        const extractedName = lines.length > 0 ? lines[0].trim() : "";

        if (extractedName !== user.fullName.trim()) {
            fs.unlinkSync(file.path);
            return res.status(400).json({
                message: "Full name in CV does not match account"
            });
        }

        /*
        ========================================
        EXTRACT DATA
        ========================================
        */

        // ===== MAJOR =====
        const majorMatch = text.match(/(Computer Science|Khoa Học Máy Tính)/i);
        const major = majorMatch ? majorMatch[0] : "";

        // ===== GPA =====
        const gpaMatch = text.match(/GPA[:\s]*([0-4]\.\d+)/i);
        const GPA = gpaMatch ? parseFloat(gpaMatch[1]) : 0;

        // ===== EXPERIENCE =====
        const expMatch = text.match(/(\d+)\s+(year|năm)/i);
        const experiences = expMatch ? parseInt(expMatch[1]) : 0;

        // ===== SKILLS DICTIONARY =====
        const skillDict = {
            programmingLanguages: ["JavaScript", "Python", "Java", "C++", "C#"],
            frameworks: ["React", "Spring Boot", "Node.js", "Express"],
            tools: ["Git", "MySQL", "MongoDB", "Docker"]
        };

        const skills = {
            programmingLanguages: skillDict.programmingLanguages.filter(s => text.includes(s)),
            frameworks: skillDict.frameworks.filter(s => text.includes(s)),
            tools: skillDict.tools.filter(s => text.includes(s))
        };

        // ===== SAVE CV (USING USER _id) =====
        const cv = await CV.findByIdAndUpdate(
            _id,
            {
                _id,
                fullName: user.fullName,
                major,
                skills,
                experiences,
                GPA
            },
            { upsert: true, new: true }
        );

        // ===== DELETE FILE AFTER PARSE =====
        fs.unlinkSync(file.path);

        res.json(cv);

    } catch (error) {

        console.error(error);

        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: error.message || "Server error" });
    }
});

/*
========================================
DELETE CV
DELETE /api/cv/:_id
========================================
*/

router.delete("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: "Invalid _id" });
        }

        const deleted = await CV.findByIdAndDelete(_id);

        if (!deleted) {
            return res.status(404).json({ message: "CV not found" });
        }

        res.json({ message: "CV deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;