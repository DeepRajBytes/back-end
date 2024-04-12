const express = require('express');
const router = express.Router();

const orderController = require("../contoller/order.controller");
const authenticated = require('../middleware/authenticate');

router.post("/",authenticated,orderController.createorder);

router.get("/:id",authenticated,orderController.findorderbyid);

router.get("/:id/history",authenticated,orderController.orderhistory);

router.get("/user/history",authenticated,orderController.orderhistory);
router.put("/updatepayment/:id", authenticated, orderController.updatePaymentStatus);

module.exports = router ; 

