const SalaryStructure = require('../models/SalaryStructure');
const Attendance = require('../models/attendance');
const Payslip = require('../models/payslip');

exports.generatePayslip = async (employeeId, month, year) => {

const structure = await SalaryStructure.findOne({ employeeId });

    if (!structure) throw new Error("Salary structure not set");

    // 👉 attendance
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

    const records = await Attendance.find({
        employeeId,
        date: { $gte: startDate, $lte: endDate }
    });

    const totalDays = new Date(year, month, 0).getDate();
    const presentDays = records.filter(r => r.status === true).length;
    const absentDays = totalDays - presentDays;

    // 💰 earnings
 
const basic = Number(structure.basic) || 0;

const hra = Number(structure.hra) || 0;
const allowance = Number(structure.allowance) || 0;
const bonus = Number(structure.bonus) || 0;


    const grossSalary = basic + hra + allowance + bonus;

    // 💸 deductions
    const perDay = basic / totalDays;

    const attendanceDeduction = absentDays * perDay;

const pf = Number(structure.pf) || 0;
const tax = Number(structure.tax) || 0;
const penalty = Number(structure.penalty) || 0;

    const totalDeduction =
        pf +
        tax +
        attendanceDeduction +
        penalty;

    // 🧮 net
    const netSalary = grossSalary - totalDeduction;

    // save
    const payslip = await Payslip.create({
        employeeId,
        month,
        year,

        presentDays,
        absentDays,

        earnings: {
            basic,
            hra,
            allowance,
            bonus
        },

        deductions: {
            pf,
            tax,
            attendance: attendanceDeduction,
            penalty
        },

        grossSalary,
        totalDeduction,
        netSalary
    });

    return payslip;
};

// 👉 employee payslips
exports.getEmployeePayslips = async (employeeId) => {
    return await Payslip.find({ employeeId })
        .sort({ year: -1, month: -1 });
};

// 👉 single payslip
exports.getSinglePayslip = async (id) => {
    return await Payslip.findById(id);
};

// 👉 admin - all payslips
exports.getAllPayslips = async (companyId) => {
    return await Payslip.find()
        .populate('employeeId', 'name email employeeCode')
        .sort({ createdAt: -1 });
};
exports.getSalary = async (employeeId) => {
    return await SalaryStructure.findOne({ employeeId });
};