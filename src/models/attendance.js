const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  employeeCode: String,

  date: String, // YYYY-MM-DD

  checkIn: Date,
  checkOut: Date,

  location: {
    lat: Number,
    lng: Number
  },

  photo: String,

  type: {
    type: String,
    enum: ["office", "client"],
    default: "office"
  },

  source: {
    type: String,
    enum: ["mobile", "excel"],
    default: "mobile"
  },

  companyId: mongoose.Schema.Types.ObjectId,

  status: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);