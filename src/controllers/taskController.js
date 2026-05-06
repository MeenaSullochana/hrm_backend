const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
    try {
        const adminId = req.user.id; // from auth middleware

        const task = await taskService.createTaskService(req.body, adminId);

        res.json({
            message: "Task created & assigned successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMyTasks = async (req, res) => {
    try {     
        const tasks = await taskService.getEmployeeTasks(req.user.id);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE STATUS + REMARK
exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTaskStatus(
            req.params.id,
            req.body,
            req.user.id
        );

        res.json({
            message: "Task updated",
            task
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.viewTask = async (req, res) => {
    try {
        const task = await taskService.viewTask(
            req.params.id,
            req.user.id
        );

        res.json({
            message: "Task get successfully",
            task
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.deleteTask = async (req, res) => {
    try {

        const { taskId } = req.params.id;

        const result = await taskService.deleteTask(taskId);

        return res.status(200).json({
            success: true,
            message: result.message
        });

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};