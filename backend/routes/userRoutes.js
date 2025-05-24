const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
} = require('../controllers/userController');

// @route   GET /api/users
// @desc    Get all users
// @access  Public (for development, should be Admin)
router.get('/', getUsers);

// @route   POST /api/users
// @desc    Register a new user
// @access  Public
router.post('/', registerUser);

// @route   POST /api/users/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', authUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Public (for development, should be Private)
router.get('/profile', getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Public (for development, should be Private)
router.put('/profile', updateUserProfile);

module.exports = router; 