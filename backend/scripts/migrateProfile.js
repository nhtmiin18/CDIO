const mongoose = require('mongoose');
const User = require('../models/User');
const Profile = require('../models/Profile');
require('dotenv').config({ path: '../.env' });

const migrateProfiles = async () => {
    try {
        // Kết nối MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Đã kết nối MongoDB');

        // Lấy tất cả users
        const users = await User.find({});
        console.log(`📊 Tìm thấy ${users.length} users`);

        let created = 0;
        let skipped = 0;

        for (const user of users) {
            // Kiểm tra profile đã tồn tại chưa
            const existingProfile = await Profile.findOne({ user: user._id });
            
            if (!existingProfile) {
                // Tạo profile mới
                await Profile.create({
                    user: user._id,
                    fullName: user.name || '',
                    // Các trường khác để mặc định
                });
                console.log(`✅ Đã tạo profile cho user: ${user.email}`);
                created++;
            } else {
                console.log(`⏭️ Profile đã tồn tại cho user: ${user.email}`);
                skipped++;
            }
        }

        console.log('\n📈 Kết quả migration:');
        console.log(`   - Đã tạo mới: ${created} profiles`);
        console.log(`   - Đã bỏ qua: ${skipped} profiles`);
        console.log('🎉 Migration hoàn tất!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Lỗi migration:', error);
        process.exit(1);
    }
};

migrateProfiles();