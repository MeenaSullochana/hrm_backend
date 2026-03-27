const service = require("../services/attendanceService");

// ✅ CHECK-IN
exports.checkIn = async (req, res) => {

  try {
    const data = await service.checkIn(req.body, req.user);

    res.status(200).json({
      status: true,
      message: "Checked in successfully",
      data
    });

  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message
    });
  }
};


// ✅ CHECK-OUT
// ✅ CHECK-OUT
exports.checkOut = async (req, res) => {
    try {
  
      const data = await service.checkOut(req.user);
  
      res.status(200).json({
        status: true,
        message: "Checked out successfully",
        data
      });
  
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message
      });
    }
  };

// ✅ MY ATTENDANCE
exports.myAttendance = async (req, res) => {
  try {
    const data = await service.getMyAttendance(req.user);

    res.json({
      status: true,
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ COMPANY ATTENDANCE
exports.companyAttendance = async (req, res) => {
  try {
    const data = await service.getCompanyAttendance(req.user);

    res.json({
      status: true,
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ EXCEL UPLOAD
exports.uploadAttendance = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "File is required"
      });
    }

    const data = await service.uploadAttendance(req.file.path, req.user);

    res.json({
      status: true,
      message: "Attendance uploaded successfully",
      count: data.length
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};