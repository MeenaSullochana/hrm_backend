const service = require("../services/companyService");

// CREATE COMPANY
exports.createCompany = async (req, res) => {
  try {
    const company = await service.createCompany(req.body, req.user);

    res.status(201).json({
      status: true,
      message: "Company created",
      data: company
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL COMPANIES
exports.getCompanies = async (req, res) => {
  try {
    const companies = await service.getCompanies();

    res.json({
      status: true,
      data: companies
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {

    if (req.user.type !== "super_admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const data = await service.getAllCompanies();

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Company
exports.updateCompany = async (req, res) => {
  try {
    const data = await service.updateCompany(req.params.id, req.body);

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Change Status
exports.changeStatus = async (req, res) => {
  try {
    const data = await service.changeStatus(req.params.id, req.body.status);

    res.json({ status: true, data });

  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
// getnotassignCompanies
exports.getnotassignCompanies = async (req, res) => {
  try {
    const companies = await service.getnotassignCompanies();

    res.json({
      status: true,
      data: companies
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};