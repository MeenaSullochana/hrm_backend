const router = require("express").Router();
const checkPermission = require("../middlewares/checkPermission");
const controller = require("../controllers/roleController");
const auth  = require("../middlewares/authCheck");

router.post("/", auth, checkPermission("create_role"), controller.createRole);
// update
router.put('/update/:id',
    auth,
checkPermission("update_role"),     controller.updateRole
);

// delete
router.delete('/delete/:id',
    auth,
   checkPermission("delete_role"), 
    controller.deleteRole
);
router.get("/permission", auth, checkPermission("get_permission"), controller.getPermission);

router.get("/", auth, checkPermission("get_role"),controller.getRoles);
router.post("/assign",auth,checkPermission("assign_role"),controller.assignRole);
module.exports = router; 