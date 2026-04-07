const router = require("express").Router();
const auth  = require("../middlewares/authCheck");

const controller = require("../controllers/notificationController");
const checkPermission = require("../middlewares/checkPermission");

// route
router.get(
    '/notifications/:employeeId',
    auth,
    controller.getNotifications
);

// ✅ MUST EXPORT
module.exports = router;