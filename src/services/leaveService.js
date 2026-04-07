const Leave = require('../models/Leave');

exports.applyLeave = async (data, employeeId) => {
    return await Leave.create({
        ...data,
        employeeId
    });
};

exports.getMyLeaves = async (employeeId) => {
    return await Leave.find({ employeeId });
};

exports.updateLeave = async (id, data, employeeId) => {
    return await Leave.findOneAndUpdate(
        { _id: id, employeeId },
        data,
        { new: true }
    );
};

exports.deleteLeave = async (id, employeeId) => {
    return await Leave.findOneAndDelete({
        _id: id,
        employeeId
    });
};