const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Đăng ký tài khoản
router.post('/register', [
    body('name').notEmpty().withMessage('Tên không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')
], authController.register);

// @route   POST /api/auth/login
// @desc    Đăng nhập
router.post('/login', [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').notEmpty().withMessage('Mật khẩu không được để trống')
], authController.login);

// @route   GET /api/auth/me
// @desc    Lấy thông tin user hiện tại
router.get('/me', auth, authController.getMe);

module.exports = router;