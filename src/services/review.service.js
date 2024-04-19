const Review = require('../models/review.model');
const ProductService = require( "../services/product.service")
const User = require('../models/user.model')


async function createReview(reqData,user){
    const product = await ProductService.findproductbyid(reqData.productId)
    const Userdata = await User.findById(user._id)
   
    const review = new Review({
        user: user._id ,
        product:product._id,
        review: reqData.review,
        createdAt:new Date(),
    })
   
    review.user = user
    await review.save()

    Userdata.review.push(review);
   
    product.reviews.push(review);


    await product.save();
     
    return product;
    ;
}

async function getallreview(productId){
    const product = await ProductService.findproductbyid(productId)

    return await Review.find({product:productId}).populate("user");
}

module.exports = {
    createReview,
    getallreview
}