const mongoose = require('mongoose');
const Student = require('../models/Student');
const path = require('path');
// Tự động tìm file .env ở thư mục gốc backend để tránh lỗi "undefined" URI
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const sampleStudents = [
  {
    studentId: '6975d97bacb59707b516cb9d',
    fullName: 'Nguyễn Văn An',
    email: 'student.an@gmail.com',
    phone: '0901234567',
    dateOfBirth: new Date('2001-03-22'),
    gender: 'male',
    address: 'Đà Nẵng',
    major: 'Công nghệ Thông tin',
    department: 'Khoa CNTT',
    gpa: 3.5,
    enrollmentDate: new Date('2018-09-01'),
    graduationDate: new Date('2022-06-30'),
    skills: [{ name: 'React' }, { name: 'JavaScript' }, { name: 'Tailwind CSS' }],
    certifications: [{ name: 'AWS Certified Developer', issuer: 'Amazon', issueDate: new Date('2021-06-01') }],
    status: 'graduated',
    // Đã sửa 'name' thành 'title' để khớp với lỗi "Project title is required"
    projects: [{ title: 'DTU Eats', role: 'Frontend', description: 'Ứng dụng đặt đồ ăn nội bộ' }],
    workExperience: [{ company: 'FPT Software', position: 'Intern', duration: '3 tháng' }],
    courses: [{ title: 'Foundations of Project Management', provider: 'Coursera' }]
  },
  {
    studentId: '65a91bb2062565d75845d002',
    fullName: 'Trần Thị Bích',
    email: 'student.bich@gmail.com',
    phone: '0909887766',
    dateOfBirth: new Date('2001-08-20'),
    gender: 'female',
    address: 'Hồ Chí Minh',
    major: 'Kinh tế',
    department: 'Khoa Kinh tế',
    gpa: 3.8,
    enrollmentDate: new Date('2019-09-01'),
    skills: [{ name: 'Java' }, { name: 'Spring Boot' }, { name: 'MySQL' }],
    status: 'active',
    projects: [{ title: 'E-Commerce System', role: 'Backend', description: 'Hệ thống bán hàng quy mô vừa' }],
    workExperience: [{ company: 'VNG', position: 'Collaborator', duration: '6 tháng' }],
    courses: [{ title: 'Agile Project Management', provider: 'Coursera' }]
  },
  {
    studentId: '65a91bb2062565d75845d004',
    fullName: 'Lê Hoàng Nam',
    email: 'student.nam@gmail.com',
    phone: '0912345678',
    dateOfBirth: new Date('2002-03-10'),
    gender: 'male',
    address: 'Hà Nội',
    major: 'Điện tử Viễn thông',
    gpa: 3.2,
    enrollmentDate: new Date('2020-09-01'),
    skills: [{ name: 'Node.js' }, { name: 'MongoDB' }, { name: 'Docker' }],
    status: 'active',
    projects: [{ title: 'Smart Home IoT', role: 'Developer', description: 'Điều khiển thiết bị qua App' }],
    workExperience: [{ company: 'Viettel', position: 'Intern', duration: '2 tháng' }],
    courses: [{ title: 'Introduction to C++', provider: 'Udemy' }]
  },
  {
    studentId: '65a91bb2062565d75845d006',
    fullName: 'Phạm Minh Tuấn',
    email: 'student.tuan@gmail.com',
    phone: '0987654321',
    dateOfBirth: new Date('1999-12-05'),
    gender: 'male',
    major: 'Ngôn ngữ Anh',
    gpa: 3.9,
    enrollmentDate: new Date('2017-09-01'),
    skills: [{ name: 'Flutter' }, { name: 'Firebase' }, { name: 'UI Design' }],
    status: 'alumni',
    projects: [{ title: 'English Learning App', role: 'Mobile Dev', description: 'App học từ vựng' }],
    workExperience: [{ company: 'LogiGear', position: 'QA Intern', duration: '4 tháng' }],
    courses: [{ title: 'Software Testing', provider: 'Coursera' }]
  },
  {
    studentId: '65a91bb2062565d75845d008',
    fullName: 'Vũ Thị Mai',
    email: 'student.mai@gmail.com',
    phone: '0933445566',
    dateOfBirth: new Date('2001-11-25'),
    gender: 'female',
    major: 'Thiết kế Đồ họa',
    gpa: 3.6,
    enrollmentDate: new Date('2019-09-01'),
    skills: [{ name: 'Jira' }, { name: 'Postman' }, { name: 'Agile' }],
    status: 'active',
    projects: [{ title: 'Brand Identity', role: 'Designer', description: 'Thiết kế bộ nhận diện thương hiệu' }],
    workExperience: [{ company: 'CMC Global', position: 'Trainee', duration: '3 tháng' }],
    courses: [{ title: 'UI/UX Design Basic', provider: 'Figma Academy' }]
  },
  {
    studentId: "65a91bb2062565d75845d010",
    fullName: "Đỗ Quang Hùng",
    email: "student.hung@gmail.com",
    phone: "0944556677",
    dateOfBirth: new Date("2001-07-18"),
    gender: "male",
    major: "Kiến trúc",
    gpa: 3.7,
    enrollmentDate: new Date("2019-09-01"),
    skills: [{ name: 'Figma' }, { name: 'Photoshop' }, { name: 'Prototyping' }],
    status: "active",
    projects: [{ title: '3D Villa Design', role: 'Lead Architect', description: 'Thiết kế biệt thự sân vườn' }],
    workExperience: [{ company: 'Kiến Trúc Việt', position: 'Assistant', duration: '5 tháng' }],
    courses: [{ title: 'AutoCAD Advanced', provider: 'LinkedIn Learning' }]
  },
];

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB thành công');

    await Student.deleteMany({});
    console.log('✅ Đã xóa dữ liệu cũ');

    await Student.insertMany(sampleStudents);
    console.log(`✅ Đã thêm ${sampleStudents.length} sinh viên mẫu hoàn chỉnh`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed dữ liệu:', error.message);
    process.exit(1);
  }
}

<<<<<<< HEAD
seedDatabase();
=======
seedDatabase();
>>>>>>> c79facef3a518b82aa232b95d9689081f51838c7
