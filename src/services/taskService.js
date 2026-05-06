const Task = require('../models/Task');
const Notification = require('../models/Notification');

exports.createTaskService = async (data, adminId) => {

    const task = await Task.create({
        ...data,
        createdBy: adminId
    });

    // 🔔 Create NotificationgetEmployeeTasks
    await Notification.create({
        employeeId: data.assignedTo,
        message: `New Task Assigned: ${data.title}`
    });

    return task;
};


// employee tasks
// exports.getEmployeeTasks = async (employeeId) => {

//     return await Task.find({ assignedTo: employeeId }).sort({ createdAt: -1 });
// };
exports.getEmployeeTasks = async (employeeId) => {

    // First check user table
    const user = await User.findById(employeeId);

    if (!user) {
        throw new Error("User not found");
    }

    let tasks;

    // If user is admin -> check createdBy
    if (user.type === 'admin') {
        tasks = await Task.find({ createdBy: employeeId })
            .sort({ createdAt: -1 });
    } 
    // Otherwise -> check assignedTo
    else {
        tasks = await Task.find({ assignedTo: employeeId })
            .sort({ createdAt: -1 });
    }

    return tasks;
};

// update status + remark
// exports.updateTaskStatus = async (taskId, data, employeeId) => {

//     const task = await Task.findOne({
//         _id: taskId,
//         assignedTo: employeeId
//     });

//     if (!task) throw new Error("Task not found");

//     task.status = data.status;
//     task.remark = data.remark;

//     await task.save();

//     return task;
// };

exports.updateTaskStatus = async (taskId, data, employeeId) => {

    // 🔍 Check user type
    const user = await User.findById(employeeId);

    if (!user) {
        throw new Error("User not found");
    }

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    // ✅ EMPLOYEE
    // Only update status & remark
    if (user.type === 'employee') {

        // Employee can update only own task
        if (task.assignedTo.toString() !== employeeId.toString()) {
            throw new Error("Unauthorized");
        }

        task.status = data.status || task.status;
        task.remark = data.remark || task.remark;
    }

    // ✅ ADMIN
    // Update all fields
    else if (user.type === 'admin') {

        task.title = data.title || task.title;
        task.description = data.description || task.description;
        task.assignedTo = data.assignedTo || task.assignedTo;
        task.workType = data.workType || task.workType;
        task.clientDetails = data.clientDetails || task.clientDetails;
        task.status = data.status || task.status;
        task.remark = data.remark || task.remark;
        task.startDate = data.startDate || task.startDate;
        task.endDate = data.endDate || task.endDate;
    }

    await task.save();

    return task;
};
exports.viewTask = async (taskId, employeeId) => {

    const task = await Task.findOne({
        _id: taskId,
    })
    .populate('assignedTo') // Employee details
    .populate('createdBy'); // Admin details

    if (!task) {
        throw new Error("Task not found");
    }

    return task;
};
exports.deleteTask = async (taskId) => {

    const task = await Task.findById(taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    await Task.findByIdAndDelete(taskId);

    return {
        success: true,
        message: "Task deleted successfully"
    };
};