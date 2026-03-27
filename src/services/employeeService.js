const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateEmployeeCode } = require("../utils/employeeCodeGenerator");

exports.createEmployee = async (data, loggedUser) => {

  const { name, email, password, roles } = data;

  const exist = await User.findOne({ email });
  if (exist) throw new Error("Email already exists");

  const hash = await bcrypt.hash(password, 10);

  // 🔥 use generator
  const employeeCode = await generateEmployeeCode(loggedUser.companyId);
  // return employeeCode;
  return await User.create({
    name,
    email,
    password: hash,
    roles,
    employeeCode,
    companyId: loggedUser.companyId,
    createdBy: loggedUser._id,
    type: "employee"
  });
};


// GET ALL EMPLOYEES
exports.getEmployees = async (user) => {
    return await User.find({
      companyId: user.companyId,
      type: "employee",
      status: true          // 🔥 ONLY ACTIVE
    }).populate("roles");
  };


// GET SINGLE EMPLOYEE
exports.getEmployeeById = async (id, loggedUser) => {
  return await User.findOne({
    _id: id,
    companyId: loggedUser.companyId
  }).populate("roles");
};


// UPDATE EMPLOYEE
exports.updateEmployee = async (id, data, loggedUser) => {
  return await User.findOneAndUpdate(
    { _id: id, companyId: loggedUser.companyId },
    data,
    { new: true }
  );
};


// DELETE EMPLOYEE
exports.deleteEmployee = async (id, loggedUser) => {
  return await User.findOneAndDelete({
    _id: id,
    companyId: loggedUser.companyId
  });
};


exports.getAllEmployeesSuperAdmin = async () => {
  return await User.find({
    type: "employee"
  })
  .populate("companyId", "name prefix")
  .populate("roles");
};

exports.getAllAdminSuperAdmin = async () => {
  return await User.find({
    type: "admin"
  })
  .populate("companyId", "name prefix")
  .populate("roles");
};

