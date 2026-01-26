const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

      const app = express();
      app.use(cors());
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

      const storage = multer.diskStorage({
            destination: function (req, file, cb) { cb(null, 'uploads/') },
            filename: function (req, file, cb) { cb(null, 'latest-cv.pdf') }
      });
      const upload = multer({ storage: storage });

      app.post('/api/upload-cv', upload.single('file'), (req, res) => {
            if (!req.file) return res.status(400).send('No file uploaded.');
               res.status(200).json({ message: "Upload success" });
      });

      app.get('/api/analyze-latest', async (req, res) => {
            try {
                const filePath = path.join(uploadDir, 'latest-cv.pdf');
                if (!fs.existsSync(filePath)) return res.status(404).json({ message: "No CV found" });

                const dataBuffer = fs.readFileSync(filePath);
                const data = await pdf(dataBuffer);
                const result = processCVContent(data.text);
                res.json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Analysis failed" });
              }
      });

      const processCVContent = (rawText) => {
           return {
                 matchScore: 85,
                 skillsIdentified: 12,
                 yearsExperience: 2,
                 matchedPositionsCount: 3,
                 skillGroups: [{ title: "Tech Stack", items: ["React", "NodeJS"] }],
                 experience: [{ title: "Experience", duration: "2 years", desc: "Detected from text" }],
                 strengthAssessment: { technical: 80, experience: 60, education: 90 },
                 matchedPositions: [{ title: "Frontend Dev", score: 85 }]
           };
};
app.listen(5000, () => console.log("Backend running on port 5000"));