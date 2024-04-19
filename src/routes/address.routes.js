const express = require('express');
const router = express.Router();

const addressController = require("../contoller/address.controller")
const authenticate = require("../middleware/authenticate");


router.post("/add",authenticate,addressController.createaddress)

router.put("/update",authenticate,addressController.updateaddress)

module.exports = router