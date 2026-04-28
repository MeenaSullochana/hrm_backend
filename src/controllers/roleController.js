const roleService = require("../services/roleService");
const { validationResult } = require("express-validator");

// CREATE ROLE
exports.createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      errors: errors.array()
    });
  }

  try {
    const role = await roleService.createRole(req.body, req.user);

    res.status(201).json({
      status: true,
      message: "Role created successfully",
      data: role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ROLES
exports.getRoles = async (req, res) => {
  try {
    const roles = await roleService.getRoles(req.user);

    res.status(200).json({
      status: true,
      data: roles
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE ROLE
exports.updateRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      errors: errors.array()
    });
  }

  try {
    const updated = await roleService.updateRole(
      req.params.id,
      req.body,
      req.user
    );

    if (!updated) {
      return res.status(404).json({
        status: false,
        message: "Role not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Role updated successfully",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE ROLE
exports.deleteRole = async (req, res) => {
  try {
    const { id } =       req.params;

    if (!id) {
      return res.status(400).json({
        message: "Role ID is required"
      });
    }

    const deleted = await roleService.deleteRole(id, req.user);

    if (!deleted) {
      return res.status(404).json({
        message: "Role not found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Role deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ASSIGN ROLE
exports.assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({
        status: false,
        message: "userId and roleId required"
      });
    }

    const result = await roleService.assignRoleToUser(
      userId,
      roleId,
      req.user
    );

    res.status(200).json({
      status: true,
      message: "Role assigned successfully",
      data: result
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};
exports.getPermission = async (req, res) => {
  try {
    const permissions = await roleService.getPermission(req.user);

    res.status(200).json({
      status: true,
      data: permissions
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};