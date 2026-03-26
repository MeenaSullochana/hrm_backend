const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: String,
  permissions: [String],
  companyId: mongoose.Schema.Types.ObjectId,
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Role", roleSchema);