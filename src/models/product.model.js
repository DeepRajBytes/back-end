const mongoose = require('mongoose');
const category = require('./category.model');

const Product = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    discountedPrice: {
        type: Number 
    },
    discountedPercent: {
        type: Number 
    },
    quantity: {
        type: Number 
    },
    brand: {
        type: String     
    },
    color: {
        type: String
    },
    size: [
        {
            name: {
                type: String
                 },
            quantity: {
                type: Number
                     }
        }
    ],
    imageUrl: {
        type: String
    },
    images: [
        {
            color: {
                type: String,
                
            },
            urls: 
                {
                    type: String,
                    
                }
            }
    ],
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ratings'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    }],
    numRatings: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    createdAt: {
        type: Date,
        default: Date.now() 
    }
});

const product = mongoose.model('product', Product);
module.exports = product;
