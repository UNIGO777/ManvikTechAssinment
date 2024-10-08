const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product' // Assuming you have a Product model
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
