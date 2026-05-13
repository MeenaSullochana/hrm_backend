const Company = require("../models/Company");
const User = require("../models/User");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");
const Payslip = require("../models/Payslip");
const Task = require("../models/Task");


// CREATE COMPANY
exports.createCompany = async (data, user) => {
  return await Company.create({
    ...data,
    createdBy: user._id
  });
};


// GET COMPANIES (Super Admin only)
exports.getAllCompanies = async () => {
  return await Company.find();
};

exports.getCompanies = async () => {
  return await Company.find({
     status: true
  });
};
exports.updateCompany = async (id, body) => {
  const company = await Company.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!company) throw new Error("Company not found");

  return company;
};

// Change Status
exports.changeStatus = async (id, status) => {
  return await Company.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

// getnotassignCompanies
exports.getnotassignCompanies = async () => {
  return await Company.find({
    admin: false,
    status: true
  });
}
exports.getDashboard = async (loggedUser) => {

  const companyId = loggedUser.companyId;

  // ===================================
  // GET COMPANY EMPLOYEES
  // ===================================

  const employees = await User.find({
    companyId,
    type: "employee"
  }).select("_id");

  const employeeIds = employees.map(emp => emp._id);

  // ===================================
  // EMPLOYEE COUNTS
  // ===================================

  const totalEmployees = await User.countDocuments({
    companyId,
    type: "employee"
  });

  const activeEmployees = await User.countDocuments({
    companyId,
    type: "employee",
    status: true
  });

  const inactiveEmployees = await User.countDocuments({
    companyId,
    type: "employee",
    status: false
  });

  // ===================================
  // TASK COUNTS
  // ===================================

  const totalTasks = await Task.countDocuments({
    assignedTo: { $in: employeeIds }
  });

  const completedTasks = await Task.countDocuments({
    assignedTo: { $in: employeeIds },
    status: "completed"
  });

  const pendingTasks = await Task.countDocuments({
    assignedTo: { $in: employeeIds },
    status: "pending"
  });

  const inProgressTasks = await Task.countDocuments({
    assignedTo: { $in: employeeIds },
    status: "in-progress"
  });

  

  const totalPayslips = await Payslip.countDocuments({
    employeeId: { $in: employeeIds }
  });

  return {

    employees: {
      totalEmployees,
      activeEmployees,
      inactiveEmployees
    },

    tasks: {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks
    },
    payslips: {
      totalPayslips
    }

  };
};