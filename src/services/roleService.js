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
// exports.getRoles = async (user) => {
//   return await Role.find({
//     companyId: user.companyId
//   });
// };
exports.getRoles = async (user) => {
  let condition = {};

  // If Super Admin -> get all roles
  if (user.type !== "super_admin") {
    condition.companyId = user.companyId;
  }

  return await Role.find(condition);
};

// UPDATE ROLE
exports.updateRole = async (id, data, user) => {
  return await Role.findOneAndUpdate(
    { _id: id },
    data,
    { new: true }
  );
};
// exports.updateRole = async (id, data, user) => {
//         console.log(id);
//     const role = await Role.findOne({
//         _id: id
       
//     });

//     if (!role) throw new Error("Role not found");

//     role.name = data.name;
//     role.permissions = data.permissions;
   
//     await role.save();

//     return role;
// };


// DELETE ROLE
// exports.deleteRole = async (id, user) => {
//   return await Role.findOneAndDelete({
//     _id: id,
//   });
// };
exports.deleteRole = async (id, user) => {
  // 1. Delete role
  const deletedRole = await Role.findOneAndDelete({
    _id: id,
  });

  // 2. Remove role id from users roles array
  await User.updateMany(
    { roles: id }, // users containing this role in array
    { $pull: { roles: id } } // remove from array
  );

  return deletedRole;
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