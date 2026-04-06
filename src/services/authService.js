const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN
exports.registerAdmin = async (data) => {
  const { name, email, password, companyId ,roles} = data;

  // check existing
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    companyId,
    roles,
    type: "admin"
  });

  return user;
};


// LOGIN
exports.login = async (data) => {
    const { email, password } = data;
  
    const user = await User.findOne({ email }).populate("roles");
  
    if (!user) throw new Error("User not found");
  
    // ❌ USER INACTIVE
    if (!user.status) {
      throw new Error("User is inactive");
    }
  
    // ❌ COMPANY INACTIVE
    if (user.companyId) {
      const Company = require("../models/Company");
      const company = await Company.findById(user.companyId);
  
      if (!company || !company.status) {
        throw new Error("Company is inactive");
      }
    }
  
    const bcrypt = require("bcryptjs");
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) throw new Error("Invalid password");
  
    const jwt = require("jsonwebtoken");
  
    const token = jwt.sign(
      {
        id: user._id,
        companyId: user.companyId,
        roles: user.roles,
        type: user.type
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  
    return { user, token };
  };