const router = require("express").Router();
const auth  = require("../middlewares/authCheck");

const controller = require("../controllers/companyController");
const checkPermission = require("../middlewares/checkPermission");

// Super Admin only
router.post("/", auth, checkPermission("create_company"),controller.createCompany);
router.get("/", auth, checkPermission("get_company"),controller.getCompanies);
router.get("/super/companies", auth, controller.getAllCompanies);
router.get("/notassign/companies", auth, controller.getnotassignCompanies);


router.put("/:id", auth, checkPermission("update_company"), controller.updateCompany);

// Change status
router.patch("/:id/status", auth, checkPermission("update_company"), controller.changeStatus);

// Assign / Change admin
module.exports = router;