const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// LOG để kiểm tra controller đã được import đúng chưa
console.log('📦 Profile Controller loaded:', Object.keys(profileController));
router.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});
// GET profile
router.get('/', auth, (req, res) => {
    console.log('➡️ GET /profile route hit');
    profileController.getProfile(req, res);
});

// Update basic info
router.put('/basic-info', auth, (req, res) => {
    console.log('➡️ PUT /profile/basic-info route hit');
    profileController.updateBasicInfo(req, res);
});

// Update university info
router.put('/university-info', auth, (req, res) => {
    console.log('➡️ PUT /profile/university-info route hit');
    profileController.updateUniversityInfo(req, res);
});

// Upload photo
router.post('/photo', auth, upload.single('photo'), (req, res) => {
    console.log('➡️ POST /profile/photo route hit');
    profileController.uploadPhoto(req, res);
});

// Update stats
router.put('/stats', auth, (req, res) => {
    console.log('➡️ PUT /profile/stats route hit');
    profileController.updateStats(req, res);
});

module.exports = router;