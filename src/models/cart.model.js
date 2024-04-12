const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    cartitems: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cartitems',
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    totalItem: {
        type: Number,
        default: 0
    },
    totalDiscountedPrice: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    }
});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;