const router = require('express').Router();

const controller = require('../controllers/leaveController');
const auth  = require("../middlewares/authCheck");
const checkPermission = require("../middlewares/checkPermission");

// apply
router.post('/apply',
    auth,
    checkPermission("create_leave"), 
    controller.applyLeave
);

// list
router.get('/my-leaves',
    auth,
 checkPermission("get_leave"),     controller.getMyLeaves
);

// update
router.put('/update/:id',
    auth,
checkPermission("update_leave"),     controller.updateLeave
);

router.get('/view/:id',
    auth,
checkPermission("view_leave"),     controller.viewLeave
);

// delete
router.delete('/delete/:id',
    auth,
   checkPermission("delete_leave"), 
    controller.deleteLeave
);

module.exports = router;