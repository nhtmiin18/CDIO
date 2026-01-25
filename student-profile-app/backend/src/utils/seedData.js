const mongoose = require('mongoose');
const Student = require('../models/Student');
require('dotenv').config();

const sampleStudents = [
  {
    studentId: 'STU2024001',
    fullName: 'Nguyễn Văn An',
    email: 'an.nguyen@university.edu.vn',
    phone: '0912345678',
    dateOfBirth: new Date('2000-05-15'),
    gender: 'male',
    address: {
      street: '123 Đường Láng',
      city: 'Hà Nội',
      country: 'Việt Nam'
    },
    major: 'Công nghệ Thông tin',
    department: 'Khoa CNTT',
    gpa: 3.5,
    enrollmentDate: new Date('2018-09-01'),
    graduationDate: new Date('2022-06-30'),
    skills: [
      { name: 'JavaScript', level: 'advanced' },
      { name: 'React', level: 'intermediate' },
      { name: 'Node.js', level: 'intermediate' }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon',
        issueDate: new Date('2021-06-01')
      }
    ],
    status: 'graduated'
  },
  {
    studentId: 'STU2024002',
    fullName: 'Trần Thị Bình',
    email: 'binh.tran@university.edu.vn',
    phone: '0987654321',
    dateOfBirth: new Date('2001-08-20'),
    gender: 'female',
    address: {
      street: '456 Nguyễn Văn Linh',
      city: 'TP.HCM',
      country: 'Việt Nam'
    },
    major: 'Kinh tế',
    department: 'Khoa Kinh tế',
    gpa: 3.8,
    enrollmentDate: new Date('2019-09-01'),
    skills: [
      { name: 'Marketing', level: 'advanced' },
      { name: 'Excel', level: 'expert' },
      { name: 'Tiếng Anh', level: 'advanced' }
    ],
    status: 'active'
  },
  {
    studentId: 'STU2024003',
    fullName: 'Lê Hoàng Cường',
    email: 'cuong.le@university.edu.vn',
    phone: '0909123456',
    dateOfBirth: new Date('2002-03-10'),
    gender: 'male',
    address: {
      street: '789 Trần Hưng Đạo',
      city: 'Đà Nẵng',
      country: 'Việt Nam'
    },
    major: 'Điện tử Viễn thông',
    department: 'Khoa ĐTVT',
    gpa: 3.2,
    enrollmentDate: new Date('2020-09-01'),
    skills: [
      { name: 'Python', level: 'intermediate' },
      { name: 'MATLAB', level: 'intermediate' }
    ],
    status: 'active'
  },
  {
    studentId: 'STU2024004',
    fullName: 'Phạm Thị Dung',
    email: 'dung.pham@university.edu.vn',
    phone: '0911122233',
    dateOfBirth: new Date('1999-12-05'),
    gender: 'female',
    address: {
      street: '321 Lê Duẩn',
      city: 'Hải Phòng',
      country: 'Việt Nam'
    },
    major: 'Ngôn ngữ Anh',
    department: 'Khoa Ngoại ngữ',
    gpa: 3.9,
    enrollmentDate: new Date('2017-09-01'),
    graduationDate: new Date('2021-06-30'),
    status: 'alumni'
  },
  {
    studentId: 'STU2024005',
    fullName: 'Hoàng Văn Em',
    email: 'em.hoang@university.edu.vn',
    phone: '0944555666',
    dateOfBirth: new Date('2001-11-25'),
    gender: 'male',
    address: {
      street: '555 Hoàng Diệu',
      city: 'Cần Thơ',
      country: 'Việt Nam'
    },
    major: 'Thiết kế Đồ họa',
    department: 'Khoa Mỹ thuật',
    gpa: 3.6,
    enrollmentDate: new Date('2019-09-01'),
    skills: [
      { name: 'Photoshop', level: 'expert' },
      { name: 'Illustrator', level: 'advanced' }
    ],
    status: 'active'
  }
];

async function seedDatabase() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB để seed dữ liệu');

    // Xóa tất cả dữ liệu cũ
    await Student.deleteMany({});
    console.log('✅ Đã xóa dữ liệu cũ');

    // Thêm dữ liệu mẫu
    await Student.insertMany(sampleStudents);
    console.log(`✅ Đã thêm ${sampleStudents.length} sinh viên mẫu`);

    // Hiển thị dữ liệu đã thêm
    const students = await Student.find();
    console.log('\n📋 Danh sách sinh viên đã thêm:');
    students.forEach(student => {
      console.log(`- ${student.studentId}: ${student.fullName} (${student.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed dữ liệu:', error);
    process.exit(1);
  }
}

seedDatabase();