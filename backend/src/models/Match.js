import mongoose from "mongoose"

const matchSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile"
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },

  matchScore: Number,
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING"
  },

  matchedSkills: [String],
  missingSkills: [String],

  

}, { timestamps: true })

export default mongoose.model("Match", matchSchema)