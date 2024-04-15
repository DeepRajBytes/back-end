
const Cart = require('../models/cart.model');
const cartItem = require('../models/cartitem.model');
const orderschema = require('../models/order.model');
const userService = require('../services/user.service')
const OrderItem = require("../models/orderItems.model")

async function updatecartitem(userId , cartitemId ,cartitemData){

    try {
        const item = await findCartitembyId(cartitemId)
        
        if(!item){
            throw new Error("Cart item not found");
        }

        const user = await userService.finduserbyid(item.userId);
        
        if(!user){
            throw new Error("User not found");
        }
        if(user._id.toString() === item.userId.toString()) {
           
            item.quantity = cartitemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedprice = item.quantity * item.product.discountedPrice;
           
           
            const updatedcartitem  = await item.save();
            return updatedcartitem; 
        } else {
            throw new Error("You can't update this item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function removecartitem(userId , cartItemId){
    try {
        const user = await userService.finduserbyid(userId);
        const cartitem = await findCartitembyId(cartItemId);
        
        if(user._id.toString() === cartitem.userId.toString()){
          return  await cartItem.findByIdAndDelete(cartItemId);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findCartitembyId(cartitemId) {
    const cartitem = await cartItem.findById(cartitemId).populate('product');
    if(cartitem){
        return cartitem;
    } else {
        throw new Error("Cart item not found");
    }
}

async function deletecartitem(userId, orderId){
    try {
        const order = await orderschema.findOne({ _id: orderId, user: userId }).populate('orderitem');
      
        if(!order){
            res.send("sorry bhai order hi ni mila order item to dur ki bat")
        }
        const orderitemid = order.orderitem

         const orderItem = await OrderItem.find({ _id: orderitemid , user: userId })

       
        if (!orderItem) {
            res.send("sorry bhai orderitem hi ni mila")
        }

        const productIds = [];

            orderItem.forEach(item => {
            productIds.push(item.product);
            });

        const cart = await Cart.find({user : userId})

        const cartId = cart[0]._id;

        const cartItems = await cartItem.deleteMany({ product: productIds, cart: cartId });
        return res.status(200).send(cartItems);

    } catch (error) {
        return res.status(404).res(error)
    }

}


module.exports ={
    findCartitembyId,
    removecartitem,
    updatecartitem,
    deletecartitem
}
