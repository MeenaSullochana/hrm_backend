const router = require("express").Router();
const auth = require("../middlewares/AuthMiddleware");
const checkPermission = require("../middlewares/checkPermission");
const controller = require("../controllers/roleController");

router.post("/", auth, checkPermission("create_role"), controller.createRole);
router.get("/", auth, controller.getRoles);
router.post("/assign",auth,controller.assignRole);
module.exports = router;