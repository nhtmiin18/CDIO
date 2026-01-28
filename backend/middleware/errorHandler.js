const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
  
    // Log error
    console.error('❌ Error:', err);
  
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
      const message = 'ID không hợp lệ';
      error = { message, statusCode: 400 };
    }
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      let message = 'Dữ liệu trùng lặp';
      if (field === 'email') {
        message = 'Email đã tồn tại';
      } else if (field === 'studentId') {
        message = 'Mã sinh viên đã tồn tại';
      }
      error = { message, statusCode: 400 };
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      const message = `Lỗi xác thực: ${messages.join(', ')}`;
      error = { message, statusCode: 400 };
    }
  
    // Multer errors
    if (err.name === 'MulterError') {
      let message = 'Lỗi upload file';
      if (err.code === 'LIMIT_FILE_SIZE') {
        message = 'Kích thước file quá lớn. Tối đa 5MB';
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        message = 'Quá nhiều file được upload';
      } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Trường file không hợp lệ';
      }
      error = { message, statusCode: 400 };
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Lỗi server'
    });
  };
  
  module.exports = errorHandler;