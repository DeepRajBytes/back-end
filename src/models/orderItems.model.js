const mongoose = require('mongoose');
// const {Schema} = mongoose

const orderItemSchema = new mongoose.Schema({
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
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountprice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    deliveryDate: {
        type: Date
    },
   
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
