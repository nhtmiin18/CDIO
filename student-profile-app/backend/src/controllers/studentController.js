const Student = require('../models/Student');
const APIFeatures = require('../utils/apiFeatures');
const fs = require('fs');
const path = require('path');

// Lấy tất cả students
exports.getAllStudents = async (req, res) => {
  try {
    console.log('🔍 [DEBUG] GET /api/students called');
    console.log('🔍 [DEBUG] Query params:', req.query);

    const features = new APIFeatures(Student.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();
    
    console.log('🔍 [DEBUG] Features created');
    console.log('🔍 [DEBUG] Query conditions:', features.query._conditions);

    const students = await features.query;
    console.log('🔍 [DEBUG] Students found:', students);

    const totalCount = await Student.countDocuments();
    console.log('🔍 [DEBUG] Total count:', totalCount);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const totalPages = Math.ceil(totalCount / limit);
    
    res.status(200).json({
      success: true,
      count: students.length,
      total: totalCount,
      pagination: {
        page,
        limit,
        totalPages,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page - 1 : null
      },
      data: students
    });
  } catch (error) {
    console.error('❌ [ERROR] getAllStudents error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Lấy student bằng ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Tạo student mới
exports.createStudent = async (req, res) => {
  try {
    // Kiểm tra studentId hoặc email đã tồn tại chưa
    const existingStudent = await Student.findOne({
      $or: [
        { studentId: req.body.studentId },
        { email: req.body.email }
      ]
    });
    
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Mã sinh viên hoặc Email đã tồn tại'
      });
    }
    
    const student = await Student.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tạo sinh viên thành công',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Cập nhật student
exports.updateStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }
    
    // Kiểm tra email trùng
    if (req.body.email && req.body.email !== student.email) {
      const emailExists = await Student.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id }
      });
      
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email đã được sử dụng bởi sinh viên khác'
        });
      }
    }
    
    student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      message: 'Cập nhật sinh viên thành công',
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Xóa student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }
    
    // Xóa file avatar nếu có
    if (student.avatar?.url && student.avatar.url.startsWith('/uploads')) {
      const avatarPath = path.join(__dirname, '..', '..', student.avatar.url);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }
    
    // Xóa file CV nếu có
    if (student.cv?.url && student.cv.url.startsWith('/uploads')) {
      const cvPath = path.join(__dirname, '..', '..', student.cv.url);
      if (fs.existsSync(cvPath)) {
        fs.unlinkSync(cvPath);
      }
    }
    
    await student.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Xóa sinh viên thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Upload avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn file ảnh'
      });
    }
    
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      // Xóa file đã upload nếu student không tồn tại
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }
    
    // Xóa avatar cũ nếu có
    if (student.avatar?.url && student.avatar.url.startsWith('/uploads')) {
      const oldPath = path.join(__dirname, '..', '..', student.avatar.url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    // Cập nhật avatar mới
    student.avatar = {
      url: `/uploads/avatars/${req.file.filename}`,
      publicId: null
    };
    
    await student.save();
    
    res.status(200).json({
      success: true,
      message: 'Upload avatar thành công',
      data: {
        avatarUrl: student.avatar.url
      }
    });
  } catch (error) {
    // Dọn dẹp file nếu có lỗi
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Upload CV
exports.uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn file CV'
      });
    }
    
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sinh viên'
      });
    }
    
    // Xóa CV cũ nếu có
    if (student.cv?.url && student.cv.url.startsWith('/uploads')) {
      const oldPath = path.join(__dirname, '..', '..', student.cv.url);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    // Cập nhật CV mới
    student.cv = {
      url: `/uploads/cvs/${req.file.filename}`,
      publicId: null,
      originalName: req.file.originalname
    };
    
    await student.save();
    
    res.status(200).json({
      success: true,
      message: 'Upload CV thành công',
      data: {
        cvUrl: student.cv.url,
        originalName: student.cv.originalName
      }
    });
  } catch (error) {
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Tìm kiếm students
exports.searchStudents = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập từ khóa tìm kiếm'
      });
    }
    
    const students = await Student.find({
      $or: [
        { fullName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { studentId: { $regex: q, $options: 'i' } },
        { major: { $regex: q, $options: 'i' } }
      ]
    }).limit(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};

// Thống kê
exports.getStudentStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: 'active' });
    const graduatedStudents = await Student.countDocuments({ status: 'graduated' });
    
    const avgGPA = await Student.aggregate([
      { $match: { gpa: { $exists: true } } },
      { $group: { _id: null, avgGPA: { $avg: '$gpa' } } }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        graduatedStudents,
        avgGPA: avgGPA[0]?.avgGPA ? avgGPA[0].avgGPA.toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};