const ProductService = require("../services/product.service")

const createproducts = async (req,res) =>{
    try {
        createproduct = await ProductService.createproduct(req.body)
        return res.status(200).send(createproduct)
    } catch (error) {
        return res.status(500).send({message:"product creation failed"})
    }
}
const deleteproduct = async (req,res) =>{
    const productId = req.params.id
        try {
        product = await ProductService.deleteproduct(productId)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message:"product delete failed"})
    }
}
const updateproducts = async (req,res) =>{
    const productId = req.params.id
        try {
        product = await ProductService.updateproduct( req.body, productId)
        return res.status(200).send(product)
    } catch (error) {
        return res.status(500).send({message:"product update failed"})
    }
}
const getAllProduct = async (req,res) => {
        const productId = req.query
        try {
            
        const products = await ProductService.getAllProducts(req.query)
        

        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


const findproductbyParticularcategory = async(req,res) =>{
   
    // console.log("dekho front end se ye aaya",req.body)
    try {
        const products = await ProductService.findproductbyParticularcategory(req.body)
        return res.status(200).send(products)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


const findproductbyids = async (req,res) => {
    const productId = req.params.id
    try {
    const product = await ProductService.findproductbyid(productId)
    return res.status(200).send(product)
} catch (error) {
    return res.status(500).send({message:"product finding by id failed"})
}
}

const createmultipleproducts = async (req,res) => {
    // const productId = req.params.id
    try {
    product = await ProductService.createMultipleProduct(req.body)
    return res.status(200).send({message:"products successfully uploaded"})
} catch (error) {
    return res.status(500).send({message:"multi product creation failed"})
}
}
const addproducttowishlist = async (req , res)=>{
    const userId= req.user._id
    const productid = req.body.prodctid
    // console.log("userid and product is is ",userId,productid);
    try {
        const messay = await ProductService.addProductToWishlist(userId,productid)
        // console.log(user)
        return res.status(200).send(messay)
    } catch (error) {
        return res.status(500).send({message:"can not get wishlist"})
    }
}

module.exports = {
    createproducts,
    deleteproduct,
    createmultipleproducts,
    findproductbyids,
    getAllProduct,
    updateproducts,
    findproductbyParticularcategory,
    addproducttowishlist

}
