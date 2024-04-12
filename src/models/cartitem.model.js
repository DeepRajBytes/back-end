const mongoose = require('mongoose')
// const {Schema} = mongoose


const cartitemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedprice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

const cartItem = mongoose.model('cartitems', cartitemSchema);

module.exports = cartItem ;