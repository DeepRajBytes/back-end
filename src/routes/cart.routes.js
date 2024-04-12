const express = require('express');
const router = express.Router();

const cartController = require("../contoller/cart.controller");
const authenticated = require('../middleware/authenticate');

router.get("/",authenticated,cartController.findusercart);
router.put("/add",authenticated,cartController.additemtocart);


module.exports = router ;
