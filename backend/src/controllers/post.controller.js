import Post from "../models/Post.js";

// SAVE DRAFT
export const saveDraft = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      description,
      internshipType,
      workMode,
      duration,
      monthlyStipend,
      recruiterId,

      minimumGPA,
      major,
      languageRequirements,
      otherRequirements,

      experienceLevel,
      experienceDescription,

      skills,
      benefits,
      certifications,
    } = req.body;

    const post = new Post({
      title,
      companyName,
      location,
      description,
      internshipType,
      workMode,
      duration,
      monthlyStipend,
      recruiterId,

      skills: {
        programmingLanguages: skills?.programmingLanguages || [],
        frameworks: skills?.frameworks || [],
        tools: skills?.tools || [],
      },

      benefits: benefits || [],
      certifications: certifications || [],

      minimumGPA,
      major,
      languageRequirements: Array.isArray(languageRequirements)
        ? languageRequirements
        : languageRequirements
        ? [languageRequirements]
        : [],
      otherRequirements,

      experienceLevel,
      experienceDescription,
      status: "DRAFT",
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUBLISH POST
export const publishPost = async (req, res) => {
  try {
    const {
      postId,

      // Basic
      title,
      companyName,
      location,
      description,
      internshipType,
      workMode,
      duration,
      monthlyStipend,
      recruiterId,

      // Additional Requirements
      minimumGPA,
      major,
      languageRequirements,
      otherRequirements,

      // Experience
      experienceLevel,
      experienceDescription,

      skills,
      benefits,
      certifications,

    } = req.body;

    const data = {
      title,
      companyName,
      location,
      description,
      internshipType,
      workMode,
      duration,
      monthlyStipend,
      recruiterId,
      skills: {
    programmingLanguages: skills?.programmingLanguages || [],
    frameworks: skills?.frameworks || [],
    tools: skills?.tools || [],
  },

  benefits: benefits || [],
  certifications: certifications || [],

      minimumGPA,
      major,
      languageRequirements: Array.isArray(languageRequirements)
        ? languageRequirements
        : languageRequirements
        ? [languageRequirements]
        : [],
      otherRequirements,

      experienceLevel,
      experienceDescription,
      status: "PUBLISHED",
    };

    let post;

    if (postId) {
      post = await Post.findByIdAndUpdate(postId, data, { new: true });
    } else {
      post = new Post(data);
      await post.save();
    }

    res.status(200).json({ message: "Publish success", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET POSTS BY RECRUITER
// export const getRecruiterPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({
//       recruiterId: req.params.id,
//       status: "PUBLISHED",
//     }).sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// export const getRecruiterPosts = async (req, res) => {
//   try {
//     const recruiterId = new mongoose.Types.ObjectId(req.params.id);

//     const posts = await Post.find({
//       recruiterId: recruiterId,
//       status: "PUBLISHED",
//     }).sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import mongoose from "mongoose";

export const getRecruiterPosts = async (req, res) => {
  try {
    const recruiterId = new mongoose.Types.ObjectId(req.params.id);


    const posts = await Post.find({
      recruiterId: recruiterId,
      status: "PUBLISHED",
    }).populate("recruiterId", "email");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("recruiterId", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const createPost = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      description,
      internshipType,
      workMode,
      duration,
      monthlyStipend,
      recruiterId,

      minimumGPA,
      major,
      languageRequirements,
      otherRequirements,

      experienceLevel,
      experienceDescription,

      skills,
      benefits,
      certifications,
    } = req.body;

    const post = new Post({
      title,
      companyName,
      location,
      description,
      internshipType,
      workMode,
      duration,
      monthlyStipend,
      recruiterId,

      skills: {
        programmingLanguages: skills?.programmingLanguages || [],
        frameworks: skills?.frameworks || [],
        tools: skills?.tools || [],
      },

      benefits: benefits || [],
      certifications: certifications || [],

      minimumGPA,
      major,
      languageRequirements: Array.isArray(languageRequirements)
        ? languageRequirements
        : languageRequirements
        ? [languageRequirements]
        : [],
      otherRequirements,

      experienceLevel,
      experienceDescription,
      status: "PUBLISHED",
    });

    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getActivePostCount = async (req, res) => {
  try {
    const count = await Post.countDocuments({ recruiter: req.user.id });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
