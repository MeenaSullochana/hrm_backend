const { body } = require("express-validator");

exports.createEmployeeValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Min 6 characters"),

  body("roles")
    .optional()
    .isArray()
    .withMessage("Roles must be array")
];