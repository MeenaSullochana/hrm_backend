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