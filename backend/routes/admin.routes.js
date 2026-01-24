const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
router.get("/top-internships", adminController.getTopInternships);

router.get("/overview", adminController.getOverview);
router.get("/activities", adminController.getActivities);
router.get("/top-internships", adminController.getTopInternships);
router.get("/usage", adminController.getUsage);

module.exports = router;
