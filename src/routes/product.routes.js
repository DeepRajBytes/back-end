const express = require('express');
const router = express.Router();
const ProductController = require("../contoller/product.controller");
const authenticated = require('../middleware/authenticate');


router.get("/",ProductController.getAllProduct);


router.post("/category/",ProductController.findproductbyParticularcategory);


router.get("/id/:id",ProductController.findproductbyids);

router.post("/wishlist",authenticated,ProductController.addproducttowishlist);

module.exports = router; 
