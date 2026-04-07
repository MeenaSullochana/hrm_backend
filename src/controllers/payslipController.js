const payslipService = require('../services/payslipService');
const Employee = require('../models/User');

exports.createPayslip = async (req, res) => {
    try {
        const { employeeId, month, year } = req.body;

        const payslip = await payslipService.generatePayslip(
            employeeId,
            month,
            year
        );

        res.json({
            message: "Payslip generated",
            payslip
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 👤 employee - my payslips
exports.myPayslips = async (req, res) => {
    try {
        const data = await payslipService.getEmployeePayslips(req.user.id);

        res.json({
            status: true,
            data
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 👤 employee - single payslip
exports.getPayslip = async (req, res) => {
    const data = await payslipService.getSinglePayslip(req.params.id);

    res.json(data);
};

// 🧑‍💼 admin - all
exports.getAllPayslips = async (req, res) => {
    const data = await payslipService.getAllPayslips(req.user.companyId);

    res.json(data);
};

// 🧑‍💼 admin - employee specific
exports.getEmployeePayslips = async (req, res) => {
    const data = await payslipService.getEmployeePayslips(req.params.employeeId);

    res.json(data);
};

exports.getSalary = async (req, res) => {
try {
        const data = await payslipService.getSalary(req.user.id);

        res.json({
            status: true,
            data
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }};