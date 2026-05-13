// ===============================
// DASHBOARD ROUTE
// ===============================



const router = require("express").Router();
const auth  = require("../middlewares/authCheck");

const dashboardController = require("../controllers/companyController");
const checkPermission = require("../middlewares/checkPermission");

// GET DASHBOARD
router.get(
  "/details",
  auth,checkPermission("get_dashboard"),
  dashboardController.getDashboard
);

module.exports = router;