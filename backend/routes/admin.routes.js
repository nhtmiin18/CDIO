const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

router.get("/overview", adminController.getOverview);
router.get("/activities", adminController.getActivities);
router.get("/top-internships", adminController.getTopInternships);
router.get("/usage", adminController.getUsage);
router.get("/users", adminController.getUsers);
router.put("/users/:id/block", adminController.toggleBlockUser);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
