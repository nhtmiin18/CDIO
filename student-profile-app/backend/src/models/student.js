const mongoose = require('mongoose');
const validator = require('validator');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  technologies: [String],
  startDate: Date,
  endDate: Date,
  githubUrl: String,
  liveUrl: String
}, { _id: true });

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: Date,
  endDate: Date,
  isCurrent: {
    type: Boolean,
    default: false
  }
}, { _id: true });

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  
  phone: {
    type: String,
    trim: true
  },
  
  dateOfBirth: {
    type: Date
  },
  
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say'],
    default: 'prefer-not-to-say'
  },
  
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  
  major: {
    type: String,
    trim: true
  },
  
  department: {
    type: String,
    trim: true
  },
  
  gpa: {
    type: Number,
    min: [0, 'GPA cannot be negative'],
    max: [4.0, 'GPA cannot exceed 4.0']
  },
  
  enrollmentDate: {
    type: Date
  },
  
  graduationDate: {
    type: Date
  },
  
  avatar: {
    url: String,
    publicId: String
  },
  
  cv: {
    url: String,
    publicId: String,
    originalName: String
  },
  
  skills: [{
    name: String,
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    }
  }],
  
  certifications: [{
    name: String,
    issuer: String,
    issueDate: Date,
    expiryDate: Date
  }],
  
  projects: [projectSchema],
  
  workExperience: [experienceSchema],
  
  courses: [{
    code: String,
    name: String,
    credits: Number,
    grade: String
  }],
  
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated', 'suspended', 'alumni'],
    default: 'active'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// XÓA PHẦN INDEXES NÀY
// studentSchema.index({ studentId: 1 });
// studentSchema.index({ email: 1 });
// studentSchema.index({ fullName: 'text', major: 'text' });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;