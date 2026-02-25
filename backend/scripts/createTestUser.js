const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createTestUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Kiểm tra user đã tồn tại chưa
        const existingUser = await User.findOne({ email: 'test@example.com' });
        if (existingUser) {
            console.log('User đã tồn tại');
            process.exit(0);
        }

        // Tạo user mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: hashedPassword,
            role: 'student'
        });

        console.log('✅ Đã tạo user thành công:', user.email);
        console.log('User ID:', user._id);
        
        process.exit(0);
    } catch (error) {
        console.error('Lỗi:', error);
        process.exit(1);
    }
};

createTestUser();