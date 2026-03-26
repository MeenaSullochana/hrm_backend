const Company = require("../models/Company");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;

    // ❌ user inactive
    if (!user.status) {
      return res.status(403).json({
        status: false,
        message: "User is inactive"
      });
    }

    // ❌ company inactive
    if (user.companyId) {
      const company = await Company.findById(user.companyId);

      if (!company || !company.status) {
        return res.status(403).json({
          status: false,
          message: "Company is inactive"
        });
      }
    }

    next();

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};