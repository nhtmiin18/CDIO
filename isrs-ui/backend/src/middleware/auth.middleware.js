import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ message: "No token" });
  }
};

// Chỉ cho student
export const studentOnly = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Student only" });
  }
  next();
};

// Chỉ cho recruiter
export const recruiterOnly = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Recruiter only" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};