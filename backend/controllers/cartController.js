const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// For development purposes, we'll use a simple in-memory cart
let globalCart = {
    items: [],
    total: 0
};

// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
    try {
        res.json(globalCart);
    } catch (error) {
        res.status(500).json({ message: 'خطأ في جلب سلة التسوق' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Public
const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        console.log('Adding product to cart:', productId, quantity);

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'المنتج غير موجود' });
        }

        // Log found product
        console.log('Found product:', product.name, product._id);

        // Check if the product is in stock
        if (product.countInStock < quantity) {
            return res.status(400).json({ message: 'المنتج غير متوفر بالكمية المطلوبة' });
        }

        // Check if product already exists in cart
        const existingItemIndex = globalCart.items.findIndex(
            item => item.productId && item.productId.toString() === productId.toString()
        );

        console.log('Existing item index:', existingItemIndex);

        if (existingItemIndex > -1) {
            // Update quantity if product exists
            globalCart.items[existingItemIndex].quantity += parseInt(quantity);
            console.log('Updated existing item quantity to:', globalCart.items[existingItemIndex].quantity);
        } else {
            // Add new item if product doesn't exist in cart
            const newItem = {
                _id: productId, // Use same ID for frontend compatibility
                productId,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: parseInt(quantity)
            };

            globalCart.items.push(newItem);
            console.log('Added new item to cart:', newItem);
        }

        // Calculate total
        globalCart.total = globalCart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        console.log('Current cart items:', globalCart.items.length);
        console.log('Current cart total:', globalCart.total);

        res.status(201).json(globalCart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'خطأ في إضافة المنتج إلى السلة' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Public
const updateCartItem = async (req, res) => {
    try {
        const productId = req.params.id;
        const { quantity } = req.body;

        if (quantity <= 0) {
            return res.status(400).json({ message: 'الكمية يجب أن تكون أكبر من صفر' });
        }

        // Find the item in the cart
        const itemIndex = globalCart.items.findIndex(
            item => item.productId && item.productId.toString() === productId.toString()
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'المنتج غير موجود في السلة' });
        }

        // Check if product is in stock
        const product = await Product.findById(productId);
        if (!product || product.countInStock < quantity) {
            return res.status(400).json({ message: 'المنتج غير متوفر بالكمية المطلوبة' });
        }

        // Update quantity
        globalCart.items[itemIndex].quantity = parseInt(quantity);

        // Recalculate total
        globalCart.total = globalCart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        res.json(globalCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'خطأ في تحديث السلة' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
    try {
        const productId = req.params.id;

        // Remove the item
        globalCart.items = globalCart.items.filter(
            item => !(item.productId && item.productId.toString() === productId.toString())
        );

        // Recalculate total
        globalCart.total = globalCart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        res.json(globalCart);
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'خطأ في حذف المنتج من السلة' });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Public
const clearCart = async (req, res) => {
    try {
        // Clear items and reset total
        globalCart.items = [];
        globalCart.total = 0;

        res.json({ message: 'تم تفريغ سلة التسوق' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'خطأ في تفريغ السلة' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
}; 