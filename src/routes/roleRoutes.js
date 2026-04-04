const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const controller = require("../controllers/roleController");

router.post("/", auth, checkPermission("create_role"), controller.createRole);
router.get("/", auth, checkPermission("get_role"),controller.getRoles);
router.post("/assign",auth,checkPermission("assign_role"),controller.assignRole);
module.exports = router; 