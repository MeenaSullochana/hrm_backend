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