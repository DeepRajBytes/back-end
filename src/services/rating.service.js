const Rating = require('../models/rating.model');
const ProductService = require('../services/product.service');

async function createrating(req,user){
const product = await ProductService.findproductbyid(req.productId)

const rate = new Rating({
    user: user._id,
    product: product._id,
    rating: req.rating,
    createdAt:new Date()
})
    await product.save();
    return rate.save();

}

async function getallrating(productId){
    const product = await ProductService.findproductbyid(reqData.productId)

    return await Rating.find({product:productId})
}
module.exports = {
    createrating,
    getallrating
}