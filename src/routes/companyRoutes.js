const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const controller = require("../controllers/companyController");
const checkPermission = require("../middlewares/checkPermission");

// Super Admin only
router.post("/", auth, checkPermission("create_company"),controller.createCompany);
router.get("/", auth, checkPermission("get_company"),controller.getCompanies);
router.get("/super/companies", auth, controller.getAllCompanies);

module.exports = router;