// test-final.js
console.log('🔰 BẮT ĐẦU TEST');
console.log('===============');

const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const User = require('./models/User');
require('dotenv').config();

(async () => {
    try {
        // 1. Kiểm tra môi trường
        console.log('📁 Thư mục hiện tại:', __dirname);
        console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
        
        // 2. Kiểm tra MONGO_URI
        if (!process.env.MONGO_URI) {
            throw new Error('❌ MONGO_URI không được định nghĩa trong .env');
        }
        console.log('✅ MONGO_URI:', process.env.MONGO_URI.substring(0, 30) + '...');

        // 3. Kết nối MongoDB
        console.log('🔄 Đang kết nối MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Đã kết nối MongoDB');

        // 4. Kiểm tra models
        console.log('📦 Kiểm tra models...');
        console.log('   - Profile model:', typeof Profile);
        console.log('   - User model:', typeof User);

        // 5. Đếm dữ liệu
        const userCount = await User.countDocuments();
        const profileCount = await Profile.countDocuments();
        
        console.log(`📊 Thống kê:`);
        console.log(`   - Users: ${userCount}`);
        console.log(`   - Profiles: ${profileCount}`);

        // 6. Lấy user đầu tiên
        const firstUser = await User.findOne();
        if (firstUser) {
            console.log(`👤 User mẫu: ${firstUser.email} (${firstUser._id})`);
            
            // 7. Tìm profile của user đó
            const userProfile = await Profile.findOne({ user: firstUser._id });
            if (userProfile) {
                console.log(`📝 Profile: ${userProfile.fullName}`);
                console.log('   Dữ liệu:', {
                    fullName: userProfile.fullName,
                    phone: userProfile.phoneNumber,
                    university: userProfile.university,
                    major: userProfile.major,
                    views: userProfile.profileViews
                });
            } else {
                console.log('⚠️ User chưa có profile');
            }
        }

    } catch (error) {
        console.error('❌ LỖI:', error);
    } finally {
        console.log('👋 Đóng kết nối...');
        await mongoose.disconnect();
        console.log('✅ Hoàn tất');
    }
})();