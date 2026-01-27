const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Phục vụ file tĩnh
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route chào mừng
app.get('/', (req, res) => {
  res.json({
    message: 'Chào mừng đến với Student Profile API',
    version: '1.0.0',
    endpoints: {
      students: '/api/students',
      search: '/api/students/search?q=keyword',
      stats: '/api/students/stats/overview',
      upload_avatar: 'POST /api/students/:id/avatar',
      upload_cv: 'POST /api/students/:id/cv'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'Connected',
    memory: process.memoryUsage()
  });
});

// API Routes
app.use('/api/students', studentRoutes);

// 404 handler - FIXED for Express 5
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy route: ${req.originalUrl}`
  });
});

// Error handler
app.use(errorHandler);

// Xử lý unhandled exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION! Tắt server...');
  console.error(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ UNHANDLED REJECTION! Tắt server...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Khởi động server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
  console.log(`🔗 Truy cập: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/`);
  console.log(`⚡ Chế độ: ${process.env.NODE_ENV || 'development'}`);
});

// Xử lý lỗi server
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Cổng ${PORT} đang được sử dụng`);
    process.exit(1);
  } else {
    console.error('❌ Lỗi server:', error);
  }
});