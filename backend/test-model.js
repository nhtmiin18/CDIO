const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const User = require('./models/User');
require('dotenv').config();

const testModel = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ DB Connected');

        // Tìm user
        const user = await User.findOne({ email: 'student@example.com' });
        console.log('👤 User found:', user.email);

        // Xóa profile cũ nếu có
        await Profile.deleteOne({ user: user._id });
        console.log('🗑️ Deleted old profile if existed');

        // Tạo profile mới KHÔNG dùng middleware
        const profile = new Profile({
            user: user._id,
            fullName: user.name || 'Test User',
            profileViews: 48,
            totalMatches: 75,
            avgMatchScore: 84
        });

        // Lưu và bắt lỗi chi tiết
        try {
            await profile.save();
            console.log('✅ Profile saved successfully');
        } catch (saveError) {
            console.error('❌ Save error:', saveError);
            console.error('Save error stack:', saveError.stack);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected');
    }
};

testModel();