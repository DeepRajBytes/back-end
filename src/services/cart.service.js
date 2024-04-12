// const Cart = require('../models/cart.model');
// const cartItem = require('../models/cartitem.model')
// const Product = require('../models/product.model')



// async function createCart(user){
//    try {
//     const cart = new Cart({user})
//     const createCart = await cart.save();
//     return createCart;

//    } catch (error) {
//    throw new Error(error.message)
//    }
// }


// async function findusercart(userId){
//    try {
//       const cart = await Cart.findOne({user:userId})

//       let cartitems = await cartItem.find({cart:cart._id}).populate('product')

//      cartitems =  cart.cartitems  

//       let totalprice = 0 ;
//       let discountedprice = 0;
//       let totalItem = 0 ;

//       for(let cartitem of cart.cartitems){
//          totalprice += cartitem.totalprice;
//          discountedprice += cartitem.discountedprice;
//          totalItem += cartitem.quantity;
//       }

//       cart.totalprice = totalprice;
//       cart.totalItem = totalItem;
//       cart.discount = totalprice - discountedprice;

//          return cart;


//    } catch (error) {
//       throw new Error(error.message);
//    }
// }

// async function addcartitem(user, req) {
//    try {
//        const cart = await Cart.findOne( {user: user} );
//        const product = await Product.findById(req.productId);

//        const isPresent = await cartItem.findOne({ cart: cart._id, product: product._id, userId: user._id });

//        if (!isPresent) {
//            const cartitem = new cartItem({
//                product: product._id,
//                cart: cart._id,
//                quantity: 1,
//                userId: user._id,
//                discountedprice: product.discountedPrice,
//                price: product.price,
//                size: req.size, 
//            });
//            const createdCartItem = await cartitem.save();

//            cart.cartitems.push(createdCartItem);  
          
//            await cart.save();

//            return createdCartItem; 
//        } else {
//            // Handle case where item is already present in the cart
//            return "Item is already present in the cart";
//        }
//    } catch (error) {
//        throw new Error(error.message);
//    }
// }

// module.exports = {createCart , addcartitem , findusercart};






// const Cart = require('../models/cart.model');
// const cartItem = require('../models/cartitem.model')
// const Product = require('../models/product.model')
// async function addcartitem(user, req) {
//    try {
//        const cart = await Cart.findOne({ user: user });
//        const product = await Product.findById(req.productId);

//        const ispresent = await cartItem.findOne({ cart: cart._id, product: product._id, userId: user._id }); // Use user._id instead of userId
     
//        if (!ispresent) {
//            const cartitem = new cartItem({
//                product: product._id,
//                cart: cart._id,
//                quantity: 1,
//                userId: user._id, // Use user._id instead of userId
//                discountedprice: product.discountedPrice,
//                price: product.price,
//                size: req.size,
//            });
//            const createdCartItem = await cartitem.save();
//            // cart.cartItem.push(cratedcartitem);
//            cart.cartitems.push(createdCartItem);
//            await cart.save();

//            return "item added to cart successfully";
//        }
//    } catch (error) {
//        throw new Error(error.message);
//    }
// }

const Cart = require('../models/cart.model');
const cartItem = require('../models/cartitem.model');
const Product = require('../models/product.model');

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
   
    try {
        const cart = await Cart.findOne({ user: userId }).populate({
            path: 'cartitems',
            populate: {
                path: 'product'
            }
        });
        
        const cartItems = await cartItem.find({ cart: cart._id }).populate('product');


        cart.cartItems = cartItems

        let totalprice = 0;
        let discountedprice = 0;
        let totalItem = 0;
        let discount = 0 ;

        for (let cartItem of cart.cartItems) {
            totalprice += cartItem.price;
            discountedprice += cartItem.discountedprice;
            totalItem += cartItem.quantity;
        }
       

        cart.totalPrice = totalprice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = discountedprice;
        
        let founddiscount = cart.totalDiscountedPrice
        discount = totalprice - founddiscount ;
        cart.discount = discount;

        
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function addcartitem(user, req) {
    
    try {
        const cart = await Cart.findOne({ user: user }).populate('cartitems');
        const product = await Product.findById(req.productId);

        const isPresent = await cartItem.findOne({size : req.size ,cart: cart._id, product: product._id, userId: user._id }).populate("product");
        
        if (!isPresent) {
            const newCartItem = new cartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId: user._id,
                discountedprice: product.discountedPrice,
                price: product.price,
                size: req.size,
            });

            const createdCartItem = await newCartItem.save();

            createdCartItem.populate("product");

             cart.cartitems.push(createdCartItem);
            await cart.save();

            return createdCartItem;
        } else {
           
            isPresent.quantity += 1;
            await isPresent.save();
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createCart, addcartitem, findUserCart };


