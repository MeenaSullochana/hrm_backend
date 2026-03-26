const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  checkIn: Date,
  checkOut: Date,
  date: Date,
  status: {
    type: Boolean,
    default: true
  },
  companyId: mongoose.Schema.Types.ObjectId

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);