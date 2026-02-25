const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Lấy thông tin profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        console.log('User from token:', req.user); // Debug
        
        // Tìm profile theo user ID
        let profile = await Profile.findOne({ user: req.user.id });
        
        // Nếu chưa có profile thì tạo mới
        if (!profile) {
            const user = await User.findById(req.user.id);
            profile = new Profile({
                user: req.user.id,
                fullName: user ? user.name : '',
            });
            await profile.save();
            console.log('Created new profile for user:', req.user.id);
        }
        
        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi lấy thông tin profile',
            error: error.message
        });
    }
};

// @desc    Cập nhật thông tin cơ bản
// @route   PUT /api/profile/basic-info
// @access  Private
const updateBasicInfo = async (req, res) => {
    try {
        const { fullName, phoneNumber, address } = req.body;
        
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { 
                $set: { 
                    fullName, 
                    phoneNumber, 
                    address 
                } 
            },
            { new: true, upsert: true }
        );
        
        res.json({
            success: true,
            message: 'Cập nhật thông tin cơ bản thành công',
            data: profile
        });
    } catch (error) {
        console.error('Update basic info error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật thông tin cơ bản',
            error: error.message
        });
    }
};

// @desc    Cập nhật thông tin trường học
// @route   PUT /api/profile/university-info
// @access  Private
const updateUniversityInfo = async (req, res) => {
    try {
        const { university, major } = req.body;
        
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: { university, major } },
            { new: true, upsert: true }
        );
        
        res.json({
            success: true,
            message: 'Cập nhật thông tin trường học thành công',
            data: profile
        });
    } catch (error) {
        console.error('Update university info error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật thông tin trường học',
            error: error.message
        });
    }
};

// @desc    Upload ảnh đại diện
// @route   POST /api/profile/photo
// @access  Private
const uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng chọn file ảnh'
            });
        }

        const photoUrl = `/uploads/${req.file.filename}`;

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: { photo: photoUrl } },
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            message: 'Upload ảnh thành công',
            data: {
                photoUrl: profile.photo
            }
        });
    } catch (error) {
        console.error('Upload photo error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi upload ảnh',
            error: error.message
        });
    }
};

// @desc    Cập nhật statistics
// @route   PUT /api/profile/stats
// @access  Private
const updateStats = async (req, res) => {
    try {
        const { profileViews, totalMatches, avgMatchScore } = req.body;
        
        const updateData = {};
        if (profileViews !== undefined) updateData.profileViews = profileViews;
        if (totalMatches !== undefined) updateData.totalMatches = totalMatches;
        if (avgMatchScore !== undefined) updateData.avgMatchScore = avgMatchScore;

        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: updateData },
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            message: 'Cập nhật thống kê thành công',
            data: {
                profileViews: profile.profileViews,
                totalMatches: profile.totalMatches,
                avgMatchScore: profile.avgMatchScore
            }
        });
    } catch (error) {
        console.error('Update stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật thống kê',
            error: error.message
        });
    }
};

// Export tất cả các hàm
module.exports = {
    getProfile,
    updateBasicInfo,
    updateUniversityInfo,
    uploadPhoto,
    updateStats
};