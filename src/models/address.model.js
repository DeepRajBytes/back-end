const mongoose = require('mongoose')


const address =new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Mobile:{
        type:Number,
    },
    Address:{
        type:String,
        require:true
    },
    City:{
        type:String,
        require:true
    },
    Pincode:{
        type:Number,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    NearBy:{
        type:String
    }

})

const addressdetails = mongoose.model("addresses",address)

module.exports = addressdetails;