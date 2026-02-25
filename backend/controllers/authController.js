const User = require('../models/User');
const Profile = require('../models/Profile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Đăng ký user mới
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Kiểm tra user đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email đã được sử dụng'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'student'
        });

        // Tạo profile cho user
        await Profile.create({
            user: user._id,
            fullName: name
        });

        // Tạo token
        const token = jwt.sign(
            { user: { id: user._id, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// @desc    Đăng nhập
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kiểm tra email và password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng nhập email và mật khẩu'
            });
        }

        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Kiểm tra status
        if (user.status === 'blocked') {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản đã bị khóa'
            });
        }

        // Kiểm tra password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Tạo token
        const token = jwt.sign(
            { user: { id: user._id, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

// @desc    Lấy thông tin user hiện tại
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server'
        });
    }
};