import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===== BASIC INFO =====
    title: String,
    companyName: String,
    location: String,
    internshipType: String,
    workMode: String,
    duration: String,
    monthlyStipend: Number,
    description: String,

    // ===== SKILLS =====
    skills: {
      programmingLanguages: [String],
      frameworks: [String],
      tools: [String],
    },

    // ===== BENEFITS =====
    benefits: [String],

    // ===== CERTIFICATIONS =====
    certifications: [String],

    // 🎓 Additional Requirements
  minimumGPA: Number,
  major: String,
  languageRequirements: [String],
  otherRequirements: String,

  // 💼 Experience
  experienceLevel: {
    type: String,
    enum: [
      'NO_EXPERIENCE',
      'SOME_EXPERIENCE',
      'SPECIFIC_EXPERIENCE'
    ]
  },
  experienceDescription: String,

  status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
