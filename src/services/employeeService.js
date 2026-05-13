const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateEmployeeCode } = require("../utils/employeeCodeGenerator");
const SalaryStructure = require('../models/SalaryStructure');

exports.createEmployee = async (data, loggedUser) => {

  const { name, email, password, roles } = data;

  const exist = await User.findOne({ email });
  if (exist) throw new Error("Email already exists");

  const hash = await bcrypt.hash(password, 10);

  // 🔥 use generator
  const employeeCode = await generateEmployeeCode(loggedUser.companyId);
  // return employeeCode;
  const employee  = await User.create({
    name,
    email,
    password: hash,
    roles,
    employeeCode,
    companyId: loggedUser.companyId,
    createdBy: loggedUser._id,
    type: "employee"
  });
    await SalaryStructure.create({
    employeeId: employee._id,
    companyId: loggedUser.companyId,

    basic: data.basic || 0,
    hra: data.hra || 0,
    allowance: data.allowance || 0,

    pf: data.pf || 0,
    tax: data.tax || 0,

    bonus: data.bonus || 0,
    penalty: data.penalty || 0
  });

  return employee;
};


// GET ALL EMPLOYEES
// exports.getEmployees = async (user) => {
//     return await User.find({
//       companyId: user.companyId,
//       type: "employee",
//       status: true          // 🔥 ONLY ACTIVE
//     }).populate("companyId")
//   .populate("roles");
//   };


// GET ALL EMPLOYEES
exports.getEmployees = async (user) => {

  // get employees
  const employees = await User.find({
    companyId: user.companyId,
    type: "employee",
    status: true
  })
    .populate("companyId")
    .populate("roles")
    .lean();

  // get employee ids
  const employeeIds = employees.map(emp => emp._id);

  // get salary structures
  const salaryStructures = await SalaryStructure.find({
    employeeId: { $in: employeeIds }
  }).lean();

  // merge salary with employee
  const result = employees.map(emp => {

    const salary = salaryStructures.find(
      sal => sal.employeeId.toString() === emp._id.toString()
    );

    return {
      ...emp,
      salaryStructure: salary || null
    };
  });

  return result;
};
// GET SINGLE EMPLOYEE
// exports.getEmployeeById = async (id, loggedUser) => {
//   return await User.findOne({
//     _id: id,
//     companyId: loggedUser.companyId
//   }).populate("roles");
// };
exports.getEmployeeById = async (id, loggedUser) => {

  // get employee
  const employee = await User.findOne({
    _id: id,
    companyId: loggedUser.companyId
  })
    .populate("roles")
    .populate("companyId")
    .lean();

  if (!employee) {
    throw new Error("Employee not found");
  }

  // get salary structure
  const salaryStructure = await SalaryStructure.findOne({
    employeeId: employee._id
  }).lean();

  // attach salary structure
  employee.salaryStructure = salaryStructure || null;

  return employee;
};

// UPDATE EMPLOYEE
// exports.updateEmployee = async (id, data, loggedUser) => {

//     const updateData = { ...data };

//     if (data.password) {
//         updateData.password = await bcrypt.hash(data.password, 10);
//     } else {
//         delete updateData.password;
//     }

//     return await User.findOneAndUpdate(
//         { _id: id, companyId: loggedUser.companyId },
//         updateData,
//         { new: true }
//     );
// };
exports.updateEmployee = async (id, data, loggedUser) => {

  const employee = await User.findOne({
    _id: id,
    companyId: loggedUser.companyId,
    type: "employee"
  });

  if (!employee) {
    throw new Error("Employee not found");
  }

  // =========================
  // EMPLOYEE UPDATE
  // =========================
  if (loggedUser.type === "employee") {

    // employee can update only own details
    if (employee._id.toString() !== loggedUser._id.toString()) {
      throw new Error("You can update only your profile");
    }

    const updateData = {
      name: data.name || employee.name,
      email: data.email || employee.email
    };

    // password update
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await User.findByIdAndUpdate(id, updateData, { new: true });

  }

  // =========================
  // ADMIN UPDATE
  // =========================
  else {

    const updateData = {
      name: data.name || employee.name,
      email: data.email || employee.email,
      roles: data.roles || employee.roles,
      status:
        data.status !== undefined
          ? data.status
          : employee.status
    };

    // password update
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    // update employee
    await User.findByIdAndUpdate(id, updateData, { new: true });

    // update salary structure
    await SalaryStructure.findOneAndUpdate(
      { employeeId: id },
      {
        basic: data.basic || 0,
        hra: data.hra || 0,
        allowance: data.allowance || 0,
        pf: data.pf || 0,
        tax: data.tax || 0,
        bonus: data.bonus || 0,
        penalty: data.penalty || 0
      },
      { new: true, upsert: true }
    );
  }

  // return updated employee with salary
  const updatedEmployee = await User.findById(id)
    .populate("companyId")
    .populate("roles")
    .lean();

  const salary = await SalaryStructure.findOne({
    employeeId: id
  });

  updatedEmployee.salaryStructure = salary;

  return updatedEmployee;
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

