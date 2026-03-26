const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: String,
  phone: String,
  address: String,
  prefix: {
    type: String,
    required: true // e.g. ABC
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);