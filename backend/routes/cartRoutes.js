const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/cart
// @desc    Get cart items
// @access  Private
router.route('/').get(getCart);

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Public
router.route('/add').post(addToCart);

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Public
router.route('/:id').put(updateCartItem);

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Public
router.route('/:id').delete(removeFromCart);

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Public
router.route('/').delete(clearCart);

module.exports = router; 