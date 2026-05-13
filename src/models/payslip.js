const mongoose = require('mongoose');

const payslipSchema = new mongoose.Schema({
 employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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