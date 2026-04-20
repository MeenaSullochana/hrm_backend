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
    codeConfig: {
    digits: {
      type: Number,
      default: 5
    },
    startFrom: {
      type: Number,
      default: 1
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: Boolean,
    default: true
  },
admin: {
  type: Boolean,
  default: false
}

}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);