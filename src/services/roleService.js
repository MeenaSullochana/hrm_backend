const Role = require("../models/Role");
const Permission = require("../models/permission");

const User = require("../models/User");

// CREATE ROLE
exports.createRole = async (data, user) => {
  return await Role.create({
    name: data.name,
    permissions: data.permissions,
    companyId: user.companyId
  });
};


// GET ROLES
exports.getRoles = async (user) => {
  return await Role.find({
    companyId: user.companyId
  });
};


// UPDATE ROLE
exports.updateRole = async (id, data, user) => {
  return await Role.findOneAndUpdate(
    { _id: id, companyId: user.companyId },
    data,
    { new: true }
  );
};


// DELETE ROLE
exports.deleteRole = async (id, user) => {
  return await Role.findOneAndDelete({
    _id: id,
    companyId: user.companyId
  });
};



// ASSIGN ROLE TO USER
exports.assignRoleToUser = async (userId, roleId, loggedUser) => {

  // optional: company check (multi-tenant security)
  const user = await User.findOne({
    _id: userId  });

  if (!user) {
    throw new Error("User not found");
  }

  // assign role (avoid duplicate)
  user.roles.addToSet(roleId);

  await user.save();

  return await user.populate("roles");
};

exports.getPermission = async (user) => {
  return await Permission.find({
  });
};