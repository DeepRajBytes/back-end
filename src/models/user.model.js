const mongoose = require('mongoose')
const userSchema =new mongoose.Schema({
    firstname:{
        type:String,
        required : true
    },
    secondname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique : true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default: "CUSTOMER"
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "addresses"
    }],
    paymentinformation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "payment_information"
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : "ratings"
    }],
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }],
    createdAT:[
        {
            type:Date,
            default:Date.now()
        }
    ]
})

const user  = mongoose.model('user',userSchema)

module.exports = user ; 