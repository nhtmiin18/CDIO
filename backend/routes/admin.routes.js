const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

/* SYSTEM REPORT */
router.get("/system-report", adminController.getSystemReport);

/* DASHBOARD */
router.get("/overview", adminController.getOverview);
router.get("/activities", adminController.getActivities);
router.get("/top-internships", adminController.getTopInternships);
router.get("/usage", adminController.getUsage);

/* USERS */
router.get("/users", adminController.getUsers);
router.put("/users/:id/block", adminController.toggleBlockUser);
router.delete("/users/:id", adminController.deleteUser);

/* INTERNSHIP POSTS */
router.get("/internship-posts", adminController.getInternshipPosts);
router.put("/internship-posts/:id/status", adminController.updatePostStatus);

module.exports = router;
