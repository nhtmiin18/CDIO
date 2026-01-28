const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const upload = require('../utils/uploadFile');

// 🔹 THÊM DÒNG NÀY ĐỂ IMPORT MODEL Student
const Student = require('../models/Student');

router.get('/test', async (req, res) => {
    try {
      console.log('✅ /api/students/test endpoint called');
      
      // Test kết nối database đơn giản
      const students = await Student.find().limit(5);
      console.log(`✅ Found ${students.length} students in database`);
      
      res.json({
        success: true,
        message: 'Test endpoint works!',
        timestamp: new Date().toISOString(),
        count: students.length,
        data: students
      });
    } catch (error) {
      console.error('❌ Test endpoint error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message
      });
    }
  });
// Public routes
router.route('/')
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router.route('/search')
  .get(studentController.searchStudents);

router.route('/stats/overview')
  .get(studentController.getStudentStats);

router.route('/:id')
  .get(studentController.getStudentById)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);

// File upload routes
router.route('/:id/avatar')
  .post(upload.single('avatar'), studentController.uploadAvatar);

router.route('/:id/cv')
  .post(upload.single('cv'), studentController.uploadCV);

module.exports = router;