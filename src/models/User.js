const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,


  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],

  type: {
    type: String,
    enum: ["super_admin", "admin", "employee"],
    default: "employee"
  },
employeeCode: {
  type: String,
  unique: true,
  sparse: true
},
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema);