const mongoose = require('mongoose');

const salaryStructureSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    basic: Number,
    hra: Number,
    allowance: Number,

    pf: Number,
    tax: Number,

    bonus: Number,      // optional
    penalty: Number     // optional

}, { timestamps: true });

module.exports = mongoose.model('SalaryStructure', salaryStructureSchema);