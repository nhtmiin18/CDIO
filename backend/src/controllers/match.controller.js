import Match from "../models/Match.js"
import { generateMatchesForPost } from "../services/match.service.js"
import mongoose from "mongoose"

export const generateMatches = async (req, res) => {
  try {
    const { postId } = req.params

    await generateMatchesForPost(postId)

    res.json({ message: "Matches generated successfully" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMatchesByPost = async (req, res) => {
  try {
    const { postId } = req.params
    // 👇 LOG 1: xem param nhận được
    console.log("PostId từ params:", postId)
    console.log("Kiểu dữ liệu postId:", typeof postId)

    // 👇 LOG 2: test find thường trước
    const testMatches = await Match.find({ postId })
    console.log("Kết quả Match.find:", testMatches)

    const matches = await Match.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(postId)  } },
      
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $sort: { matchScore: -1 } }
    ])

    res.json(matches)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}