const router = require("express").Router();

const auth  = require("../middlewares/authCheck");
const checkStatus = require("../middlewares/checkStatus");
const checkPermission = require("../middlewares/checkPermission");
const controller = require("../controllers/attendanceController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// EMPLOYEE
router.post(
    "/checkin",
    auth,
    checkStatus,
    upload.single("photo"),   // 🔥 ADD THIS
    controller.checkIn
  );

  router.post("/checkout", auth, checkStatus, controller.checkOut);
router.get("/me", auth, checkStatus, controller.myAttendance);

// ADMIN
router.get(
  "/company",
  auth,
  checkStatus,
  checkPermission("view_attendance"),
  controller.companyAttendance
);

router.post(
  "/upload",
  auth,
  checkStatus,
  checkPermission("attendance_upload"),
  upload.single("file"),
  controller.uploadAttendance
);
router.get('/monthly-report',
    auth,  checkPermission("attendance_report"),

    controller.monthlyReport
);
module.exports = router;