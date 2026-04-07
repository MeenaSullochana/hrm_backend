const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // multiple admin support
        required: true
    },

    workType: {
        type: String,
        enum: ['office', 'client_site'],
        required: true
    },

    clientDetails: {
        location: String,
        clientName: String,
        contactNumber: String
    },

    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed'],
        default: 'pending'
    },
    remark: String, // ✅ add this

    startDate: Date,
    endDate: Date

}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);