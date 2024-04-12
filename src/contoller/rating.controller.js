const ratingService = require('../services/rating.service')

const  createrating  = async (req,res) =>{
    user = req.user
    try {
        const review = await ratingService.createrating(req.body,user)
        return res.status(200).send(review)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const  getrating  = async (req,res) =>{
    user = req.user;productId
    try {
        const review = await ratingService.getallrating(productId);
        return res.status(200).send(review)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    getrating,
    createrating
}