const router = require('express').Router();

const controller = require('../controllers/payslipController');
const auth  = require("../middlewares/authCheck");
const checkPermission = require("../middlewares/checkPermission");

// admin create payslip
router.post('/create',
    auth,
   checkPermission("create_payslip"),
    controller.createPayslip 
);


// 👤 employee
router.get('/my',
    auth,
   checkPermission("get_payslip"),

    controller.myPayslips
);
router.get('/salarystructure',
    auth,
    controller.getSalary
);
// 👤 employee single
router.get('/view/:id',
    auth,
      checkPermission("view_payslip"),

    controller.getPayslip
);

router.delete('/delete/:id',
    auth,
   checkPermission("delete_payslip"), 
    controller.deletePayslip
);

// 🧑‍💼 admin all
router.get('/all',
    auth,
   
    controller.getAllPayslips
);

// 🧑‍💼 admin employee wise
router.get('/employee/:employeeId',
    auth,
    
    controller.getEmployeePayslips
);

module.exports = router;