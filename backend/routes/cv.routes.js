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
    limits: { fileSize: 5 * 1024 * 1024 },
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
========================================
*/
router.post("/upload", upload.single("cv"), async (req, res) => {
    try {
        const file = req.file;
        const { _id } = req.body;

        if (!file)
            return res.status(400).json({ message: "No file uploaded" });

        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            if (file?.path && fs.existsSync(file.path))
                fs.unlinkSync(file.path);
            return res.status(400).json({ message: "Invalid user id" });
        }

        const user = await User.findById(_id);
        if (!user) {
            fs.unlinkSync(file.path);
            return res.status(404).json({ message: "User not found" });
        }

        /* =========================
           READ PDF
        ========================== */
        const buffer = fs.readFileSync(file.path);
        const data = await pdfParse(buffer);
        const text = data.text;

        // DEBUG nếu cần
        // console.log("PDF TEXT:", text);

        /* =========================
           EXTRACT MAJOR (VN + EN)
        ========================== */
        const majorMatch = text.match(/(Major|Chuyên ngành):\s*(.+?)(\||\n)/i);
        const major = majorMatch ? majorMatch[2].trim() : "";

        /* =========================
           EXTRACT GPA
        ========================== */
        const gpaMatch = text.match(/GPA:\s*([\d.]+)/i);
        const GPA = gpaMatch ? parseFloat(gpaMatch[1]) : 0;

        /* =========================
           EXTRACT EXPERIENCE (năm)
        ========================== */
        let experiences = 0;
        const expMatch = text.match(/(\d+)\s*năm/i);
        if (expMatch) {
            experiences = parseInt(expMatch[1]);
        }

        /* =========================
           SKILLS (LUÔN ĐÚNG STRUCTURE)
        ========================== */

        const skills = {
            programmingLanguages: [],
            frameworks: [],
            tools: []
        };

        // Programming Languages
        const langMatch = text.match(
            /(Programming Languages|Ngôn ngữ lập trình):\s*(.+)/i
        );
        if (langMatch) {
            skills.programmingLanguages = langMatch[2]
                .split(",")
                .map(s => s.trim());
        }

        // Frameworks
        const frameworkMatch = text.match(
            /(Frameworks|Framework):\s*(.+)/i
        );
        if (frameworkMatch) {
            skills.frameworks = frameworkMatch[2]
                .split(",")
                .map(s => s.trim());
        }

        // Tools
        const toolsMatch = text.match(
            /(Tools|Công cụ):\s*(.+)/i
        );
        if (toolsMatch) {
            skills.tools = toolsMatch[2]
                .split(",")
                .map(s => s.trim());
        }

        /* =========================
           SAVE TO DB
        ========================== */

        const cv = await CV.findByIdAndUpdate(
            _id,
            {
                _id,
                fullName: user.fullName,
                major,
                experiences,
                GPA,
                skills
            },
            { upsert: true, new: true }
        );

        if (fs.existsSync(file.path))
            fs.unlinkSync(file.path);

        res.json(cv);

    } catch (error) {

        console.error("Upload error:", error);

        if (req.file?.path && fs.existsSync(req.file.path))
            fs.unlinkSync(req.file.path);

        res.status(500).json({ message: error.message });
    }
});

/*
========================================
DELETE CV
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