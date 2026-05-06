const Leave = require('../models/Leave');
const User = require('../models/User');

exports.applyLeave = async (data, employeeId) => {
    return await Leave.create({
        ...data,
        employeeId
    });
};

// exports.getMyLeaves = async (employeeId) => {
//     return await Leave.find({ employeeId });
// }; 

exports.getMyLeaves = async (employeeId) => {

    // Check user
    const user = await User.findById(employeeId);

    if (!user) {
        throw new Error("User not found");
    }

    let leaves = [];

    // Admin
    if (user.type === 'admin') {

        // Get users created by this admin
        const users = await User.find({
            createdBy: employeeId
        }).select('_id');

        // Extract user ids
        const userIds = users.map(user => user._id);

        // Fetch leave records
        leaves = await Leave.find({
            employeeId: { $in: userIds }
        }).sort({ createdAt: -1 });

    } else {

        // Normal user leaves
        leaves = await Leave.find({
            employeeId: employeeId
        }).sort({ createdAt: -1 });
    }

    return leaves;
};

// exports.updateLeave = async (id, data, employeeId) => {
//     return await Leave.findOneAndUpdate(
//         { _id: id, employeeId },
//         data,
//         { new: true }
//     );
// };
exports.updateLeave = async (id, data, employeeId) => {

    // Get logged in user
    const user = await User.findById(employeeId);

    if (!user) {
        throw new Error("User not found");
    }

    let leave;

    // Admin can update status
    if (user.type === 'admin') {

        leave = await Leave.findByIdAndUpdate(
            id,
            {
                status: data.status
            },
            { new: true }
        );

    } else {

        // Normal user can update only own leave
        leave = await Leave.findOneAndUpdate(
            {
                _id: id,
                userId: employeeId
            },
            data,
            { new: true }
        );
    }

    if (!leave) {
        throw new Error("Leave not found");
    }

    return leave;
};
exports.deleteLeave = async (id, employeeId) => {
    return await Leave.findOneAndDelete({
        _id: id,
        employeeId
    });
};

exports.viewLeave= async (leaveid, employeeId) => {

    const leave = await Leave.findOne({
        _id: leaveid,
    })
    .populate('employeeId'); // Employee details
    if (!leave) {
        throw new Error("Leave not found");
    }

    return leave;
};