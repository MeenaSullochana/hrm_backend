const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
    const data = await Notification.find({
        employeeId: req.params.employeeId
    }).sort({ createdAt: -1 });

    res.json(data);
};