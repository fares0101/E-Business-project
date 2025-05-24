const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require('../controllers/orderController');

// @route   GET /api/orders
// @desc    Get all orders
// @access  Public (for development, should be Admin)
router.route('/')
    .get(getOrders)
    .post(createOrder);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public (for development, should be Private/Admin)
router.route('/:id')
    .get(getOrderById)
    .put(updateOrderStatus);

module.exports = router; 