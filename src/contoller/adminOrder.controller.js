const orderService = require("../services/order.service")

const getAllorders =async (req,res)=>{
    try {
        const orders = await orderService.getallorders()
        return res.status(200).send(orders)

    } catch (error) {
       return RES.STATUS(500).send({error:error.message})
    }
}



const confirmedorder =async (req,res)=>{
    orderid = req.params.orderid
    try {
        const orders = await orderService.confirmorder(orderid)
        return res.status(200).send(orders)

    } catch (error) {
       return RES.STATUS(500).send({error:error.message})
    }
}
const shiporder =async (req,res)=>{
    orderid = req.params.orderid
    try {
        const orders = await orderService.shippeorder(orderid)
        return res.status(200).send(orders)

    } catch (error) {
       return RES.STATUS(500).send({error:error.message})
    }
}
const deliverdorders =async (req,res)=>{
    orderid = req.params.orderid
    try {
        const orders = await orderService.deliverdorder(orderid)
        return res.status(200).send(orders)

    } catch (error) {
       return RES.STATUS(500).send({error:error.message})
    }
}

const cancelorders =async (req,res)=>{
    orderid = req.params.orderid
    try {
        const orders = await orderService.cancelorder(orderid)
        return res.status(200).send(orders)

    } catch (error) {
       return RES.STATUS(500).send({error:error.message})
    }
}




const deleteorderforadmin =async (req,res)=>{
    orderid = req.params.orderid
    try {
        const orders = await orderService.deleteorder(orderid)
        return res.status(200).send(orders)

    } catch (error) {
       return RES.STATUS(500).send({error:error.message})
    }
}

module.exports = {
    deleteorderforadmin,
    cancelorders,
    deliverdorders,
    shiporder,
    confirmedorder,
    getAllorders
}