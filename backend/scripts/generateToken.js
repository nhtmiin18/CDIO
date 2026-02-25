const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const generateToken = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Tìm user
        const user = await User.findOne({ email: 'test@example.com' });
        
        if (!user) {
            console.log('❌ Không tìm thấy user');
            process.exit(1);
        }

        console.log('✅ Tìm thấy user:', user.email);
        console.log('User ID:', user._id.toString());

        // Tạo token
        const token = jwt.sign(
            { user: { id: user._id.toString(), role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('\n📋 TOKEN ĐẦY ĐỦ (COPY TỪ ĐÂY):');
        console.log('==========================================');
        console.log(token);
        console.log('==========================================');
        console.log('\n📌 Độ dài token:', token.length, 'ký tự');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Lỗi:', error);
        process.exit(1);
    }
};

generateToken();