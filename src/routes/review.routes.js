const express = require('express')
const router = express.Router();
const authenticated = require('../middleware/authenticate');

const reviewController = require("../contoller/review.controller");

router.post("/create",authenticated,reviewController.createreview);
router.get("/product/:productId",authenticated,reviewController.getreview);

module.exports = router ; 
