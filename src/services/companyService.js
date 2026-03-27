const Company = require("../models/Company");

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
  return await Company.find();
};