const cartService = require("../services/cart.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const User = require("../models/user.model")

const OrderItem = require("../models/orderItems.model");


async function createorder(user, shipaddress) {
    let address;
    if (shipaddress.id) {
        
        const existaddress = await Address.findById(shipaddress.id);

        address = existaddress;
    }
     else {
        
        address = new Address(shipaddress);
        address.user = user;
        await address.save();
        console.log(address);
        user.address.push(address);
        await user.save();
    }


    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    // console.log("this is cart" , cart);

    for (const item of cart.cartitems) {

        const orderitem = new OrderItem({
            product: item.product,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
            discountprice: item.discountedprice,
            user: user._id,
            deliveryDate: new Date() 
        });
        const createorderItem = await orderitem.save();
        // console.log("yha pe orderitem bana",createorderItem);
        orderItems.push(createorderItem);
    }

    

    const createOrder = new Order({
        user: user,
        orderitem: orderItems,
        totalprice: cart.totalPrice,
        totaldiscountprice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalitem: cart.totalItem,
        shippingAddress: address
    });
    const saveorder = await createOrder.save();
    // console.log("yha par order bana", saveorder)
    return saveorder;
}

async function placeorder(orderId) {

    const order = await findorderbyid(orderId);

    order.orderStatus = "PENDING";
    order.paymentdetails.status = "COMPLETETED";
    return await order.save();
}
async function confirmorder(orderId) {

    const order = await findorderbyid(orderId);

    order.orderStatus = "CONFIRMED";
    order.paymentdetails.status = "COMPLETETED";
    return await order.save();
}

// async function shippeorder(orderId) {

//     const order = await findorderbyid(orderId);
//     createorder
//     order.orderStatus = "SHIPPED";
//     order.paymentdetails.status = "COMPLETETED";
//     return await order.save();
// }

// async function deliverdorder(orderId) {

//     const order = await findorderbyid(orderId);
//     createorder
//     order.orderStatus = "SHIPPED";
//     order.paymentdetails.status = "DELIVERD";
//     return await order.save();
// }

async function cancelorder(orderId) {

    const order = await findorderbyid(orderId);

    order.orderStatus = "CANCELED";
    order.paymentdetails.status = "DELIVERD";
    return await order.save();
}

async function findorderbyid(orderId) {
    const order = await Order.findById(orderId).populate('user').populate({path:"orderitem",populate:{path:"product"}}).populate("shippingAddress");
   
    return order;   
}
async function userorderhistory(userId){
    try {
        const orders = await Order.find({user:userId , orderstatus:"PENDING"}).populate({path:"orderitem",populate:{path:"product"}}).lean();
        return orders;

    } catch (error) {
        throw new Error(error.message);
    }

}
async function getallorders(){
   
        await Order.find().populate({path:"orderItems",populate:{path:"products"}}).lean();

}

async function deleteorder(orderId){
    const  order = await findorderbyid(orderId);
    await Order.findByIdAndDelete(order._id);
}
async function updatePaymentStatus(orderId , req) {
 
    const order = await findorderbyid(orderId);
    order.paymentDetails.paymentid = req.paymentid;
    order.paymentDetails.transactionid = req.transactionid
    order.paymentDetails.paymentmethod = req.paymentmethod
    order.paymentDetails.paymentstatus = "SUCCESS";
    return await order.save();
}

module.exports = { updatePaymentStatus,findorderbyid, cancelorder,confirmorder, placeorder, createorder  ,userorderhistory,deleteorder,getallorders}
