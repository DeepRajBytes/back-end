const reviewService = require('../services/review.service')

const  createreview  = async (req,res) =>{
    user = req.user
    try {
        const review = await reviewService.createReview(req.body , user)
        return res.status(200).send(review)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const  getreview  = async (req,res) =>{
    user = req.user;
    productId = req.params.productId
    
    try {
        const review = await reviewService.getallreview(productId)
        return res.status(200).send(review)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    getreview,
    createreview
}