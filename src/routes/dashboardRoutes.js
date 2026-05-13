// ===============================
// DASHBOARD ROUTE
// ===============================

const express = require("express");
const router = express.Router();
const checkPermission = require("../middlewares/checkPermission");

const dashboardController = require("../controllers/companyController");

const auth = require("../middleware/auth");

// GET DASHBOARD
router.get(
  "/details",
  auth,checkPermission("get_dashboard"),
  dashboardController.getDashboard
);

module.exports = router;