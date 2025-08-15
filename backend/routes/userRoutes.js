const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Apply middleware to all routes in this file
router.use(protect);
router.use(admin);

// Define the routes
router.route('/').get(getUsers);

router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;