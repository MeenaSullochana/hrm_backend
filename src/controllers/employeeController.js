const service = require("../services/employeeService");
const { validationResult } = require("express-validator");

// CREATE
exports.createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const data = await service.createEmployee(req.body, req.user);

    res.status(201).json({
      status: true,
      message: "Employee created",
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL
exports.getEmployees = async (req, res) => {
  try {
    const data = await service.getEmployees(req.user);

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ONE
exports.getEmployee = async (req, res) => {
  try {
    const data = await service.getEmployeeById(req.params.id, req.user);

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const data = await service.updateEmployee(
      req.params.id,
      req.body,
      req.user
    );

    res.json({ status: true, message: "Updated", data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    await service.deleteEmployee(req.params.id, req.user);

    res.json({ status: true, message: "Deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {

    if (req.user.type !== "super_admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const data = await service.getAllEmployeesSuperAdmin();

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {

    if (req.user.type !== "super_admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const data = await service.getAllAdminSuperAdmin();

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};