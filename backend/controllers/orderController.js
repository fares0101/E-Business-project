const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod, items, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'لا توجد منتجات في السلة' });
        }

        const order = new Order({
            user: req.user ? req.user._id : null,
            orderItems: items,
            shippingAddress,
            paymentMethod,
            totalPrice,
            status: 'pending'
        });

        const createdOrder = await order.save();

        // Clear the cart after creating the order
        if (req.user) {
            await Cart.findOneAndUpdate(
                { user: req.user._id },
                { items: [] },
                { new: true }
            );
        }

        res.status(201).json(createdOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'خطأ في إنشاء الطلب' });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin/Private
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'خطأ في جلب الطلبات' });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'الطلب غير موجود' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'خطأ في جلب الطلب' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Admin/Private
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'الرجاء تحديد حالة الطلب' });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'الطلب غير موجود' });
        }

        order.status = status;

        // If status is delivered, set deliveredAt date
        if (status === 'delivered') {
            order.deliveredAt = Date.now();
        }

        // If status is paid, set isPaid flag and paidAt date
        if (status === 'processing') {
            order.isPaid = true;
            order.paidAt = Date.now();
        }

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'خطأ في تحديث حالة الطلب' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
}; 