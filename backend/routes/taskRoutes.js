const express = require('express');
const router = express.Router();
const { 
    createTask, 
    getTasks, 
    getTaskById, 
    updateTask,
    deleteTask 
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Routes for /api/tasks
router.route('/')
    .post(protect, upload.array('documents', 3), createTask)
    .get(protect, getTasks);

// Routes for /api/tasks/:id
router.route('/:id')
    .get(protect, getTaskById)
    .put(protect, upload.array('documents', 3), updateTask)
    .delete(protect, deleteTask);

module.exports = router;