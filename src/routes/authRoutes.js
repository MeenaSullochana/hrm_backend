const router = require("express").Router();
const checkPermission = require("../middlewares/checkPermission");

const controller = require("../controllers/authController");

const {
  registerValidation,
  loginValidation
} = require("../validations/authValidation");

// REGISTER ADMIN
router.post("/register", registerValidation, controller.registerAdmin);
router.put("/admin/:id", controller.updateAdmin);
// router.put("/admin-status/:id", controller.updateAdminStatus);

// LOGIN
router.post("/login", loginValidation, controller.login);

module.exports = router;