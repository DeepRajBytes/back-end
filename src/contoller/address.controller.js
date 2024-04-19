const addressService = require('../services/address.service')

const createaddress = async (req,res)=>{
    const userID = req.user
    try {
        const address = await addressService.createaddress(userID , req.body)
        
        res.status(200).send(address)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}

const updateaddress = async(req,res)=>{
    const userID =  req.user._id
    const data = {id:req.body.id , reqdata: req.body.reqdata}
   
    try {
        const user = await addressService.updateaddress(userID,data)
        console.log("user is", user)
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}
module.exports = {createaddress , updateaddress}