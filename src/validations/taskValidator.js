exports.validateTask = (req, res, next) => {
    const { title, assignedTo, workType } = req.body;

    if (!title || !assignedTo || !workType) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    if (workType === 'client_site') {
        if (!req.body.clientDetails || !req.body.clientDetails.location) {
            return res.status(400).json({
                message: "Client location required for client site work"
            });
        }
    }

    next();
};