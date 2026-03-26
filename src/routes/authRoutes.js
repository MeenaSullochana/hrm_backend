const router = require("express").Router();

const controller = require("../controllers/authController");

const {
  registerValidation,
  loginValidation
} = require("../validations/authValidation");

// REGISTER ADMIN
router.post("/register", registerValidation, controller.registerAdmin);

// LOGIN
router.post("/login", loginValidation, controller.login);

module.exports = router;