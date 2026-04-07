const Task = require('../models/Task');
const Notification = require('../models/Notification');

exports.createTaskService = async (data, adminId) => {

    const task = await Task.create({
        ...data,
        createdBy: adminId
    });

    // 🔔 Create Notification
    await Notification.create({
        employeeId: data.assignedTo,
        message: `New Task Assigned: ${data.title}`
    });

    return task;
};


// employee tasks
exports.getEmployeeTasks = async (employeeId) => {
    return await Task.find({ assignedTo: employeeId }).sort({ createdAt: -1 });
};

// update status + remark
exports.updateTaskStatus = async (taskId, data, employeeId) => {

    const task = await Task.findOne({
        _id: taskId,
        assignedTo: employeeId
    });

    if (!task) throw new Error("Task not found");

    task.status = data.status;
    task.remark = data.remark;

    await task.save();

    return task;
};