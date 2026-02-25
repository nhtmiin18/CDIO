const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const getToken = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Tìm user student@example.com
        const user = await User.findOne({ email: 'student@example.com' });
        
        if (!user) {
            console.log('❌ Không tìm thấy user student@example.com');
            process.exit(1);
        }

        console.log('✅ Tìm thấy user:');
        console.log('   ID:', user._id.toString());
        console.log('   Email:', user.email);
        console.log('   Name:', user.name);
        console.log('   Role:', user.role);

        // Tạo token
        const token = jwt.sign(
            { user: { id: user._id.toString(), role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('\n🔑 TOKEN CHO POSTMAN:');
        console.log('=================================');
        console.log(token);
        console.log('=================================');
        console.log('\n📝 Header cần thêm:');
        console.log('x-auth-token:', token);

    } catch (error) {
        console.error('❌ Lỗi:', error);
    } finally {
        await mongoose.disconnect();
    }
};

getToken();