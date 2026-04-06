const router = require("express").Router();
const checkPermission = require("../middlewares/checkPermission");
const controller = require("../controllers/roleController");
const auth  = require("../middlewares/authCheck");

router.post("/", auth, checkPermission("create_role"), controller.createRole);
router.get("/", auth, checkPermission("get_role"),controller.getRoles);
router.post("/assign",auth,checkPermission("assign_role"),controller.assignRole);
module.exports = router; 