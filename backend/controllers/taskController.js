const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    // We no longer get assignedTo from the body
    const { title, description, status, priority, dueDate } = req.body;

    try {
        // We automatically get the logged-in user's ID from the 'protect' middleware
        const task = new Task({
            title,
            description,
            status,
            priority,
            dueDate,
            assignedTo: req.user.id, // Assign to the logged-in user
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// ... (The rest of the file remains exactly the same) ...

// @desc    Get all tasks for a user or all tasks for an admin
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const { status, priority, sort, page = 1, limit = 10 } = req.query;
        const query = {};
        if (req.user.role !== 'admin') {
            query.assignedTo = req.user.id;
        }
        if (status) {
            query.status = status;
        }
        if (priority) {
            query.priority = priority;
        }
        const sortOptions = {};
        if (sort) {
            const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
            const sortOrder = sort.startsWith('-') ? -1 : 1;
            sortOptions[sortField] = sortOrder;
        } else {
            sortOptions.createdAt = -1;
        }
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const tasks = await Task.find(query)
            .populate('assignedTo', 'email')
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum);
        const totalTasks = await Task.countDocuments(query);
        res.json({
            tasks,
            currentPage: pageNum,
            totalPages: Math.ceil(totalTasks / limitNum),
            totalTasks,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        const task = await Task.findById(req.params.id).populate('assignedTo', 'email');
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (req.user.role !== 'admin' && task.assignedTo._id.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        res.json(task);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        if (req.files && req.files.length > 0) {
            req.body.documents = req.files.map(file => file.path);
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('assignedTo', 'email');
        res.json(updatedTask);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (req.user.role !== 'admin' && task.assignedTo.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};