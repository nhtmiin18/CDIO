import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["student", "recruiter","admin"],
      required: true,
    },

    // dùng chung
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    // STUDENT
    fullName: String,
    university: String,
    major: String,
    
    skills: {
  programmingLanguages: [String],
  frameworks: [String],
  tools: [String]
    } ,
    year: Number,   
    certifications: [String], 
    gpa:Number,

    // RECRUITER
    companyName: String,
    companyWebsite: String,
    hrName: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
