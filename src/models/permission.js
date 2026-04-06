const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true  // create_employee, update_company
  },
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Permission", permissionSchema);