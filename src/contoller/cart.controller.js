// const cartService = require("../services/cart.service")

// const findusercart = async(req,res)=>{
//     const user =await req.user
//     try {
//        const cart = await cartService.findusercart(user._id)
//        res.status(200).send(cart)


//     } catch (error) {
//         // throw new Error("Cart creation failed");
//         throw new Error({error:error.message})
//     }
// }



// const additemtocart = async(req,res)=>{
//     const user =await req.user
//     try {
//        const cartitem = await cartService.addcartitem(user._id , req.body)
//        res.status(200).send(cartitem)


//     } catch (error) {
//         // throw new Error("Cart creation failed");
//         // throw new Error({error:error.message})
//         console.error("Error adding item to cart:", error); // Log the actual error
//         res.status(500).send("Error adding item to cart");
//     }
// }

// module.exports = {
//     findusercart,
//     additemtocart
// }







const cartService = require("../services/cart.service")

const findusercart = async(req,res)=>{
    const user = req.user
    // console.log(user._id);
    try {
       const cart = await cartService.findUserCart(user._id)
       res.status(200).send(cart)


    } catch (error) {
        console.log(error);
        // throw new Error("Cart creation failed");
        // throw new Error({error:error.message})
    }
}



const additemtocart = async(req,res)=>{
    const user = req.user
    
    try {
       const cartitem = await cartService.addcartitem(user._id , req.body)
       
       res.status(200).send(cartitem)


    } catch (error) {
        console.error("Error adding item to cart:", error); 
        res.status(500).send("Error adding item to cart");
    }
}

module.exports = {
    findusercart,
    additemtocart
}



