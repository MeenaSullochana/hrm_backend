const authService = require("../services/authService");
const { validationResult } = require("express-validator");

// REGISTER ADMIN
exports.registerAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      errors: errors.array()
    });
  }

  try {
    const user = await authService.registerAdmin(req.body);

    res.status(201).json({
      status: true,
      message: "Admin created successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message
    });
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const result = await authService.updateAdmin(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      errors: errors.array()
    });
  }

  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      status: true,
      message: "Login successful",
      token: result.token,
      user: result.user
    });

  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message
    });
  }
};