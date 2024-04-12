const express = require('express');
const router = express.Router();
const paymentcontrol = require('../contoller/payment.controller');


router.post('/', paymentcontrol.paymentController);

module.exports = router;
