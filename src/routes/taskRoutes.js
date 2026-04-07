const router = require('express').Router();
const controller = require('../controllers/taskController');
const { validateTask } = require('../validations/taskValidator');
const auth  = require("../middlewares/authCheck");
const checkPermission = require("../middlewares/checkPermission");

router.post('/create',
  auth, checkPermission("create_task"), 
    validateTask,
    controller.createTask
);

// employee view tasks
router.get('/my-tasks',
    auth,
   checkPermission("get_task"),
    controller.getMyTasks
);

// employee update task
router.put('/update/:id',
    auth,checkPermission("update_task"),
    controller.updateTask
);

module.exports = router;