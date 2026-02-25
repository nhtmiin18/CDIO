const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');  
const profileRoutes = require('./routes/profile');

const app = express();

// Connect to MongoDB
connectDB();

// CORS - QUAN TRỌNG NHẤT
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);    
app.use('/api/profile', profileRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    res.status(500).json({ success: false, message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});