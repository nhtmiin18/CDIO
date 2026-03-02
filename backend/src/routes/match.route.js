import express from "express"
import { generateMatches, getMatchesByPost } from "../controllers/match.controller.js"

const router = express.Router()

router.post("/generate/:postId", generateMatches)
router.get("/post/:postId", getMatchesByPost)

export default router