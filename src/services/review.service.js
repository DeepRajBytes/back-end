const Review = require('../models/review.model');
const ProductService = require( "../services/product.service")

async function createReview(reqData,user){
    const product = await ProductService.findproductbyid(reqData.productId)

    const review = new Review({
        user: user._id ,
        product:product._id,
        review: reqData.review,
        createdAt:new Date(),
    })
    await product.save();
    return await review.save();
}

async function getallreview(productId){
    const product = await ProductService.findproductbyid(reqData.productId)

    return await Review.find({product:productId}).populate("user");
}

module.exports = {
    createReview,
    getallreview
}