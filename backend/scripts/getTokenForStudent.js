const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/User');

// Load env từ đúng đường dẫn
require('dotenv').config();

console.log('🔍 Đang tìm user student@example.com...');
console.log('📁 Đường dẫn .env:', path.join(__dirname, '../.env'));
console.log('🔧 MONGO_URI:', process.env.MONGO_URI ? '✅ Đã load' : '❌ Không load được');

const getToken = async () => {
    try {
        // Kiểm tra MONGO_URI
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI không được định nghĩa trong file .env');
        }

        console.log('📦 Đang kết nối MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Đã kết nối MongoDB');

        // Tìm user
        const user = await User.findOne({ email: 'student@example.com' });
        
        if (!user) {
            console.log('❌ Không tìm thấy user với email: student@example.com');
            console.log('📝 Danh sách users trong DB:');
            const allUsers = await User.find({});
            allUsers.forEach(u => console.log(`   - ${u.email}`));
            process.exit(1);
        }

        console.log('\n✅ TÌM THẤY USER:');
        console.log('   ID:', user._id.toString());
        console.log('   Email:', user.email);
        console.log('   Name:', user.name || 'Không có tên');
        console.log('   Role:', user.role);

        // Tạo token
        const token = jwt.sign(
            { user: { id: user._id.toString(), role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        console.log('\n🔑 TOKEN CHO POSTMAN:');
        console.log('==========================================');
        console.log(token);
        console.log('==========================================');
        console.log('\n📝 COPY DÒNG TRÊN và dán vào Postman với header:');
        console.log('x-auth-token:', token);

    } catch (error) {
        console.error('❌ Lỗi:', error.message);
    } finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
            console.log('\n👋 Đã đóng kết nối');
        }
    }
};

getToken();