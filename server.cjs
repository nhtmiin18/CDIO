const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'latest-cv.pdf')
    }
});

const upload = multer({ storage: storage });

const findEmail = (text) => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    const match = text ? text.match(emailRegex) : null;
    return match ? match[0] : "Not found";
};

const findPhone = (text) => {
    const phoneRegex = /(0[3|5|7|8|9]+[0-9]{8})\b/g;
    const match = text ? text.match(phoneRegex) : null;
    return match ? match[0] : "Not found";
};

const findSkills = (textLower) => {
    if (!textLower) return [];
    const dictionary = [
        "python", "javascript", "typescript", "java", "c++", "c#", "php", "ruby", "swift", "kotlin",
        "react", "angular", "vue", "next.js", "node.js", "express", "django", "flask", "spring boot",
        "aws", "azure", "google cloud", "docker", "kubernetes", "jenkins", "git",
        "mysql", "postgresql", "mongodb", "sql", "redis",
        "html", "css", "sass", "tailwind", "bootstrap",
        "machine learning", "ai", "data analysis", "nlp", "communication", "teamwork"
    ];
    return dictionary.filter(skill => textLower.includes(skill));
};

const predictRole = (skills) => {
    const frontend = ["react", "angular", "vue", "html", "css", "javascript"];
    const backend = ["node.js", "python", "java", "sql", "mongodb", "aws"];
    let feScore = 0;
    let beScore = 0;

    skills.forEach(s => {
        if (frontend.includes(s)) feScore++;
        if (backend.includes(s)) beScore++;
    });

    if (feScore > beScore) return "Frontend Developer";
    if (beScore > feScore) return "Backend Developer";
    return "Fullstack Developer";
};

const processCVContent = (rawText) => {
    const textLower = rawText.toLowerCase();
    const email = findEmail(rawText);
    const phone = findPhone(rawText);
    const foundSkills = findSkills(textLower);

    let years = 0;
    const experienceRegex = /(\d+)\+?\s*years?/g;
    const expMatches = textLower.match(experienceRegex);
    if (expMatches) {
        const numbers = expMatches.map(m => parseInt(m));
        years = Math.max(...numbers);
    } else {
        if (textLower.includes("senior") || textLower.includes("lead")) years = 5;
        else if (textLower.includes("junior")) years = 1;
        else if (textLower.includes("intern")) years = 0;
    }

    let score = Math.min(40 + (foundSkills.length * 5) + (years * 2), 98);
    const predictedRole = predictRole(foundSkills);

    return {
        matchScore: score,
        skillsIdentified: foundSkills.length,
        yearsExperience: years,
        matchedPositionsCount: Math.ceil(score / 15),
        skillGroups: [
            {
                title: "Detected Tech Stack",
                items: foundSkills.length > 0 ? foundSkills : ["No specific tech skills found"]
            },
            {
                title: "Contact Info",
                items: [email, phone]
            }
        ],
        experience: [
            {
                title: "Experience Analysis",
                duration: `${years} year(s) detected`,
                desc: `Based on content analysis. Role suggested: ${predictedRole}`
            }
        ],
        strengthAssessment: {
            technical: Math.min(foundSkills.length * 10, 100),
            experience: Math.min(years * 20, 100),
            education: 85
        },
        matchedPositions: [
            { title: predictedRole, score: score },
            { title: predictedRole === "Frontend Developer" ? "UI/UX Engineer" : "System Architect", score: score - 10 }
        ]
    };
};

app.post('/api/upload-cv', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    res.status(200).json({ message: "Upload success" });
});

app.get('/api/analyze-latest', async (req, res) => {
    try {
        const filePath = path.join(uploadDir, 'latest-cv.pdf');

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "No CV found" });
        }

        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        const result = processCVContent(data.text);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Analysis failed" });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));