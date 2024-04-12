const express = require('express');
const router = express.Router();
const adminProductController = require("../contoller/product.controller");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate, adminProductController.createproducts);
router.post("/creates", authenticate, adminProductController.createmultipleproducts);
router.delete("/:id", authenticate, adminProductController.deleteproduct);
router.put("/:id", authenticate, adminProductController.updateproducts);

module.exports = router;
