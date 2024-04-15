const express = require('express');
const router = express.Router();

const cartItem = require('../contoller/cartitem.controller');
const authenticated = require('../middleware/authenticate');

router.put("/:id",authenticated,cartItem.updatedcartitem)

router.delete("/:id",authenticated,cartItem.removecartitem)

router.delete("/deleteitem/:id",authenticated , cartItem.deletecartitem)

module.exports = router;