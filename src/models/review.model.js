const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    
    },
    review:{
        type:String,
        required:true
    
    },
    createdAt:{
        type:Date,
        default:Date.now()
    
    },


})

const review = mongoose.model('review',reviewSchema)

module.exports = review ; 