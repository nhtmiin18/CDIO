const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const User = require('./models/User');
require('dotenv').config();

const testDirect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to DB');

        // Tìm user
        const user = await User.findOne({ email: 'student@example.com' });
        console.log('👤 User:', user.email, user._id);

        // Thử tạo profile trực tiếp
        const profile = new Profile({
            user: user._id,
            fullName: user.name || 'Test User'
        });
        
        await profile.save();
        console.log('✅ Profile created:', profile._id);

        // Tìm profile vừa tạo
        const found = await Profile.findOne({ user: user._id });
        console.log('📝 Found profile:', found ? 'Yes' : 'No');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

testDirect();