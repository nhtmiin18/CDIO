import Match from "../models/Match.js"
import User from "../models/User.js"
import Post from "../models/Post.js"

export const generateMatchesForPost = async (postId) => {
  try {
    const post = await Post.findById(postId)
    if (!post) throw new Error("Post not found")

    // Lấy tất cả student
    const students = await User.find({ role: "student" })

    for (const student of students) {
      if (!student.skills) continue

      let rawScore = 0
      let matchedSkills = []
      let missingSkills = []

      // ==============================
      // LẤY SKILLS
      // ==============================
      const {
        programmingLanguages = [],
        frameworks = [],
        tools = []
      } = student.skills

      const postProg = post.skills?.programmingLanguages || []
      const postFrameworks = post.skills?.frameworks || []
      const postTools = post.skills?.tools || []

      // Normalize để tránh lỗi React vs react
      const normalize = (arr) =>
        arr.map((s) => s.trim().toLowerCase())

      const studentAll = normalize([
        ...programmingLanguages,
        ...frameworks,
        ...tools
      ])

      const postAll = normalize([
        ...postProg,
        ...postFrameworks,
        ...postTools
      ])

      if (postAll.length === 0) continue

      // ==============================
      // ==============================
// 1️⃣ PROGRAMMING LANGUAGES (30%)
// ==============================
const progMatches = programmingLanguages.filter(skill =>
  postProg.includes(skill)
)

const progScore =
  postProg.length > 0
    ? (progMatches.length / postProg.length) * 30
    : 0

// ==============================
// 2️⃣ FRAMEWORKS (25%)
// ==============================
const frameworkMatches = frameworks.filter(skill =>
  postFrameworks.includes(skill)
)

const frameworkScore =
  postFrameworks.length > 0
    ? (frameworkMatches.length / postFrameworks.length) * 25
    : 0

// ==============================
// 3️⃣ TOOLS (15%)
// ==============================
const toolMatches = tools.filter(skill =>
  postTools.includes(skill)
)

const toolScore =
  postTools.length > 0
    ? (toolMatches.length / postTools.length) * 15
    : 0

rawScore += progScore + frameworkScore + toolScore

matchedSkills = [
  ...progMatches,
  ...frameworkMatches,
  ...toolMatches
]

missingSkills = [
  ...postProg.filter(skill => !programmingLanguages.includes(skill)),
  ...postFrameworks.filter(skill => !frameworks.includes(skill)),
  ...postTools.filter(skill => !tools.includes(skill))
]

      // ==============================
      // 2️⃣ GPA (10%)
      // ==============================
      if (post.minimumGPA) {
        const studentGPA = student.gpa || 0

        if (studentGPA >= post.minimumGPA) {
          rawScore += 10
        } else {
          rawScore +=
            (studentGPA / post.minimumGPA) * 10
        }
      }

      // ==============================
      // 3️⃣ MAJOR (10%)
      // ==============================
      if (
        post.major &&
        student.major &&
        student.major
          .toLowerCase()
          .includes(post.major.toLowerCase())
      ) {
        rawScore += 10
      }

      // ==============================
      // 4️⃣ EXPERIENCE (10%)
      // ==============================
      const levelMap = {
        NO_EXPERIENCE: 0,
        SOME_EXPERIENCE: 1,
        SPECIFIC_EXPERIENCE: 2
      }

      if (post.experienceLevel) {
        const postLevel =
          levelMap[post.experienceLevel] || 0

        const studentLevel =
          student.year >= 4
            ? 2
            : student.year >= 2
            ? 1
            : 0

        if (studentLevel >= postLevel) {
          rawScore += 10
        } else if (postLevel > 0) {
          rawScore +=
            (studentLevel / postLevel) * 10
        }
      }

      // ==============================
      // SCALE 60–100%
      // ==============================
      rawScore = Math.min(100, rawScore)

      let finalScore = 60 + rawScore * 0.4
      finalScore = Math.round(finalScore)
      finalScore = Math.max(60, Math.min(100, finalScore))

      // ==============================
      // SAVE MATCH
      // ==============================
      await Match.findOneAndUpdate(
        {
          userId: student._id,
          profileId: student._id,
          postId: post._id
        },
        {
          userId: student._id,
          profileId: student._id,
          postId: post._id,
          matchScore: finalScore,
          matchedSkills,
          missingSkills,
          status: "PENDING"
        },
        { upsert: true, new: true }
      )
    }

    console.log("✅ Matching completed successfully")
  } catch (error) {
    console.error("❌ Matching error:", error)
    throw error
  }
}