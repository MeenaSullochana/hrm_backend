const router = require("express").Router();

const auth = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const controller = require("../controllers/employeeController");
const checkStatus = require("../middlewares/checkStatus");

const {
  createEmployeeValidation
} = require("../validations/employeeValidation");

// CREATE
router.post(
  "/",
  auth,checkStatus,
  checkPermission("create_employee"),
  createEmployeeValidation,
  controller.createEmployee
);

// GET ALL
router.get(
  "/",
  auth,checkStatus,
  checkPermission("view_employee"),
  controller.getEmployees
);

// GET ONE
router.get(
  "/:id",
  auth,checkStatus,
  checkPermission("view_employee"),
  controller.getEmployee
);

// UPDATE
router.put(
  "/:id",
  auth,checkStatus,
  checkPermission("update_employee"),
  controller.updateEmployee
);

// DELETE
router.delete(
  "/:id",
  auth,checkStatus,
  checkPermission("delete_employee"),
  controller.deleteEmployee
);

module.exports = router;