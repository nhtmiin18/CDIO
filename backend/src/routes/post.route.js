import express from "express";
import {
  saveDraft,
  publishPost,
  getRecruiterPosts,
  getAllPosts,
  getActivePostCount, 
  getPostById,
  updatePost,
  getRecruiterStats,
} from "../controllers/post.controller.js";
import { protect } from "../middleware/auth.middleware.js";




const router = express.Router();

router.post("/draft", saveDraft);
router.post("/publish", publishPost);
router.get("/recruiter/:id", getRecruiterPosts);
router.get("/", getAllPosts);
router.get("/count", protect, getActivePostCount);
router.get("/:id", protect, getPostById);
router.put("/:id", protect, updatePost);
router.get("/stats/:recruiterId", getRecruiterStats);




export default router;
