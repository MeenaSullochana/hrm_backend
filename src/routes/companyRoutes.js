const router = require("express").Router();

const auth = require("../middlewares/AuthMiddleware");
const controller = require("../controllers/companyController");

// Super Admin only
router.post("/", auth, controller.createCompany);
router.get("/", auth, controller.getCompanies);

module.exports = router;