const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
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
rating:{
    type:String,
    required:true

},
createdAt:{
    type:Date,
    default:Date.now()

},

})

const ratings = mongoose.model('ratings',ratingSchema);

module.exports = ratings