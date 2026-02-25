const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Lấy token từ header
    let token = req.header('x-auth-token');
    
    console.log('🔐 Auth middleware - Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Không tìm thấy token, từ chối truy cập' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token decoded:', decoded);
        
        req.user = decoded.user;
        console.log('👤 User ID:', req.user.id);
        
        next();
    } catch (err) {
        console.error('❌ Token error:', err.message);
        return res.status(401).json({ 
            success: false,
            message: 'Token không hợp lệ' 
        });
    }
};