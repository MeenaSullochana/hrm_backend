const Counter = require("../models/Counter");
const Company = require("../models/Company");

// 🔢 Get next sequence
const getNextSequence = async (companyId) => {
  const counter = await Counter.findOneAndUpdate(
    { companyId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
};

// 🔥 Generate Employee Code
const generateEmployeeCode = async (companyId) => {
  const company = await Company.findById(companyId);

  if (!company) {
    throw new Error("Company not found");
  }

  const seq = await getNextSequence(companyId);

  const padded = String(seq).padStart(3, "0");

  return `${company.prefix}-${padded}`;
};

module.exports = {
  generateEmployeeCode
};