const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product',
                },
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, default: 1 },
            },
        ],
        total: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart; 