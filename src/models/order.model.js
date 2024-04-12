const mongoose =  require('mongoose');
// const {Schema} = mongoose

const orderSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    orderitem: [{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem",
        required:true
    }],
    orderDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
    deliveryDate:{
        type:Date,
        // required:true
    },
    shippingAddress: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses',
        required: true
    },
    paymentDetails:{
        paymentmethod:{
            type:String
        },
        transactionid:{
            type:String
        },
        paymentid:{
            type:String
        },
        paymentstatus:{
            type:String,
            default:"pending"
        }

    },
    totalprice:{
        type:Number,
        required:true
    },
    totaldiscountprice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    orderstatus:{
        type:String,
        default:"PENDING"

    },
    totalitem:{
        type:Number,
        required:true


    },
    createdAt:{
        type:Date,
        default:Date.now()
}
})

const orderschema = mongoose.model('orderschema',orderSchema);

module.exports = orderschema
