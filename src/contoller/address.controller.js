const addressService = require('../services/address.service')

const createaddress = async (req,res)=>{
    const userID = req.user._id
    console.log("chuka chuha mujho chua");
    try {
        const address = await addressService.createaddress(userID , req.body)
        
        res.status(200).send(address)
    } catch (error) {
        res.status(404).send({error:error.message})
    }
}
module.exports = {createaddress}