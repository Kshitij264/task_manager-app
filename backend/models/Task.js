const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    dueDate: {
        type: Date,
        required: [true, 'Please provide a due date']
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    documents: [{
        type: String // An array of file paths for the PDFs
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);