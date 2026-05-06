const leaveService = require('../services/leaveService');

// apply
exports.applyLeave = async (req, res) => {
    const leave = await leaveService.applyLeave(req.body, req.user.id);
    res.json({ message: "Leave applied", leave });
};

// list
// exports.getMyLeaves = async (req, res) => {
//     const leaves = await leaveService.getMyLeaves(req.user.id);
//     res.json(leaves);
// };
exports.getMyLeaves = async (req, res) => {
    try {     
        const leaves = await leaveService.getMyLeaves(req.user.id);
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.viewLeave = async (req, res) => {
    try {
        const leave = await leaveService.viewLeave(
            req.params.id,
            req.user.id
        );

        res.json({
            message: "Leave get successfully",
            task
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// update
exports.updateLeave = async (req, res) => {
    const leave = await leaveService.updateLeave(
        req.params.id,
        req.body,
        req.user.id
    );

    res.json({ message: "Updated", leave });
};

// delete
exports.deleteLeave = async (req, res) => {
    await leaveService.deleteLeave(req.params.id, req.user.id);
    res.json({ message: "Deleted" });
};