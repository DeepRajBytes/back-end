const user = require("../models/user.model");
const orderService = require("../services/order.service");
    
const createorder = async(req,res)=>{
    const user =await req.user
    try {
        const createOrder = await orderService.createorder(user,req.body)
        return res.status(200).send(createOrder);
    } catch (error) {
        console.log("order nhi bana",error);
        return res.status(500).send({error:error.message})
    }
}
const findorderbyid= async(req,res)=>{
    // const user =await req.user
    try {
        const createOrder = await orderService.findorderbyid(req.params.id)
        return res.status(200).send(createOrder);
    } catch (error) {
        // console.log(error)
        return res.status(500).send({message:"oh oh Order Failed ,ye to me hu  lets try again"})
    }
}

const orderhistory= async(req,res)=>{
    const user = await req.user;
    try {
        const createOrder = await orderService.userorderhistory(user._id)
        return res.status(200).send(createOrder);
    } catch (error) {
        // console.log(error)
        return res.status(500).send({message:"oh oh Order Failed "})
    }
}
const updatePaymentStatus = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updateorder = await  orderService.updatePaymentStatus(orderId , req.body);
        return res.status(200).send(updateorder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createorder,
    findorderbyid,
    orderhistory,
    updatePaymentStatus
}

