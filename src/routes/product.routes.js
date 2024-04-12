const express = require('express');
const router = express.Router();
const ProductController = require("../contoller/product.controller")


router.get("/",ProductController.getAllProduct);


router.post("/category/",ProductController.findproductbyParticularcategory);


router.get("/id/:id",ProductController.findproductbyids)

module.exports = router; 
