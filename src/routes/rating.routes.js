const express = require('express')
const router = express.Router();
const authenticated = require('../middleware/authenticate');

const ratingController = require("../contoller/rating.controller");

router.post("/create",authenticated,ratingController.createrating);
router.get("/product/:productId",authenticated,ratingController.getrating);

module.exports = router ; 
