const User = require("../models/User");
const Company = require("../models/Company");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN
// exports.registerAdmin = async (data) => {
//   const { name, email, password, companyId ,roles} = data;

//   // check existing
//   const existing = await User.findOne({ email });
//   if (existing) {
//     throw new Error("Email already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     companyId,
//     roles,
//     type: "admin"
//   });

//   return user;
// };
exports.registerAdmin = async (data) => {
  const { name, email, password, companyId, roles } = data;

  // Check existing email
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Email already exists");
  }

  // Check company exists and is admin = true
  const company = await Company.findOne({
    _id: companyId
     });
  

  if (!company) {
    throw new Error("Invalid company admin ID");
  }
    company.admin = true;

    await company.save();
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user
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
exports.updateAdmin = async (employeeId, id, data) => {

  // logged user
  const user = await User.findById(employeeId);

  if (!user) {
    throw new Error("User not found");
  }

  // existing admin
  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new Error("Admin not found");
  }

  // ======================================
  // EMAIL DUPLICATE CHECK
  // ======================================

  if (data.email && data.email !== existingUser.email) {

    const emailCheck = await User.findOne({
      email: data.email,
      _id: { $ne: id }
    });

    if (emailCheck) {
      throw new Error("Email already exists");
    }
  }

  // ======================================
  // ADMIN UPDATE
  // only name, email, password
  // ======================================

  if (user.type === "admin") {

    let updateData = {
      name: data.name || existingUser.name,
      email: data.email || existingUser.email
    };

    // password update
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return updated;
  }

  // ======================================
  // SUPER ADMIN UPDATE
  // full access
  // ======================================

  if (user.type === "super-admin") {

    const {
      name,
      email,
      phone,
      password,
      companyId,
      roles,
      status
    } = data;

    // company change
    if (
      companyId &&
      companyId !== existingUser.companyId?.toString()
    ) {

      // remove old company admin
      await Company.findByIdAndUpdate(
        existingUser.companyId,
        { admin: false }
      );

      // check new company
      const company = await Company.findOne({
        _id: companyId,
        status: true
      });

      if (!company) {
        throw new Error("Selected company inactive");
      }

      // set new company admin
      await Company.findByIdAndUpdate(
        companyId,
        { admin: true }
      );
    }

    let updateData = {
      name,
      email,
      phone,
      companyId,
      roles,
      status
    };

    // password update
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return updated;
  }

  throw new Error("Unauthorized access");
};

  // exports.updateAdmin = async (employeeId,id, data) => { 
  //       const auser = await User.findById(employeeId);
  //    if (!auser) {
  //       throw new Error("User not found");
  //   }
  //    const { name, email,phone, password, companyId, roles, status } = data;  
  //    const existingUser = await User.findById(id); 
  //     if (!existingUser) {   
  //        throw new Error("Admin not found");  
  //       }  // Email duplicate check 
  //            if (email && email !== existingUser.email) {    
  //         const emailCheck = await User.findOne({    
  //             email,      _id: { $ne: id }    });    
  //             if (emailCheck) {      
  //               throw new Error("Email already exists");   
  //              }  }   
  //               if (    companyId &&    companyId !== existingUser.companyId?.toString()  )
  //                  {       
  //                   await Company.findByIdAndUpdate(existingUser.companyId, {     
  //                      admin: false   
  //                      });   
  //                         const company = await Company.findOne({  
  //                               _id: companyId,      status: true    });
  //                                   if (!company) {  
  //                                         throw new Error("Selected company inactive");  
  //                                         }   
  //                                          await Company.findByIdAndUpdate(companyId, {    
  //                                             admin: true,  
  //                                                   });  }  
  //                   let updateData = {    name,    email,    companyId,    roles,    status  };
  //                     // If inactive 
                  
  //                         if (password) { 
  //                              updateData.password = await bcrypt.hash(password, 10);
  //                               } 
  //                         const updated = await User.findByIdAndUpdate(
  //                               id,    updateData,    
  //                               { new: true }  );  
  //                               return updated;
  //                             };