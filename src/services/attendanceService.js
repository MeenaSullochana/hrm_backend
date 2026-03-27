const Attendance = require("../models/attendance");
const User = require("../models/User");
const XLSX = require("xlsx");

// ✅ CHECK-IN
exports.checkIn = async (data, user) => {

  const today = new Date().toISOString().split("T")[0];

  const exists = await Attendance.findOne({
    employeeId: user._id,
    date: today,
    companyId: user.companyId
  });

  if (exists) {
    throw new Error("Already checked in today");
  }

  return await Attendance.create({
    employeeId: user._id,
    employeeCode: user.employeeCode,
    date: today,
    checkIn: new Date(),
    location: {
      lat: data.lat,
      lng: data.lng
    },
    photo: data.photo,
    type: "office",
    source: "mobile",
    companyId: user.companyId
  });
};


// ✅ CHECK-OUT

exports.checkOut = async (user) => {

  const today = new Date().toISOString().split("T")[0];

  // find today's attendance
  const attendance = await Attendance.findOne({
    employeeId: user._id,
    companyId: user.companyId,
    date: today,
    status: true
  });

  if (!attendance) {
    throw new Error("Check-in not found for today");
  }

  if (attendance.checkOut) {
    throw new Error("Already checked out");
  }

  attendance.checkOut = new Date();

  return await attendance.save();
};


// ✅ MY ATTENDANCE
exports.getMyAttendance = async (user) => {
  return await Attendance.find({
    employeeId: user._id,
    companyId: user.companyId,
    status: true
  }).sort({ date: -1 });
};


// ✅ COMPANY ATTENDANCE (ADMIN)
exports.getCompanyAttendance = async (user) => {
  return await Attendance.find({
    companyId: user.companyId,
    status: true
  })
  .populate("employeeId", "name employeeCode")
  .sort({ date: -1 });
};


// ✅ CLIENT EXCEL UPLOAD
exports.uploadAttendance = async (filePath, user) => {

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);

  const records = [];

  for (const row of rows) {

    const employee = await User.findOne({
      employeeCode: row.employeeCode,
      companyId: user.companyId
    });

    if (!employee) continue;

    records.push({
      employeeId: employee._id,
      employeeCode: employee.employeeCode,
      date: row.date,
      checkIn: new Date(row.checkIn),
      checkOut: new Date(row.checkOut),
      type: "client",
      source: "excel",
      companyId: user.companyId
    });
  }

  if (records.length === 0) {
    throw new Error("No valid data found in Excel");
  }

  return await Attendance.insertMany(records);
};