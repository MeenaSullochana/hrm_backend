const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
    employeeId: mongoose.Schema.Types.ObjectId,
    month: Number,
    year: Number,

    presentDays: Number,
    absentDays: Number,

    earnings: {
        basic: Number,
        hra: Number,
        allowance: Number,
        bonus: Number
    },

    deductions: {
        pf: Number,
        tax: Number,
        attendance: Number,
        penalty: Number
    },

    grossSalary: Number,
    totalDeduction: Number,
    netSalary: Number

}, { timestamps: true });

module.exports = mongoose.model('Payslip', payslipSchema);