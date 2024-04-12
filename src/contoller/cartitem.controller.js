const cartItemService = require("../services/cartitem.service")

const updatedcartitem = async (req,res) =>{
    const user = await req.user
   
    try {
       const cartitem = await cartItemService.updatecartitem(user._id,req.params.id , req.body)
        
    return res.status(200).send(cartitem)

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const removecartitem = async (req,res) =>{
    const user = await req.user
    try {
       await cartItemService.removecartitem(user._id,req.params.id , req.body)
        
    return res.status(200).send({message:"cart Item Remove SuccessFully"})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const deletecartitem = async(req,res)=>{
    const user = await req.user
    const userid = user._id
    const orderid = req.params.id
    try {
        await cartItemService.deletecartitem(userid , orderid)
        return res.status(200).send({message:"kam ho chuka hai successfull"});
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    updatedcartitem,
    removecartitem,
    deletecartitem
}