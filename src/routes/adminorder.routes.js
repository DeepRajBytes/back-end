const express = require('express');
const router = express.Router();
const adminController = require("../contoller/adminOrder.controller")
const authenticate = require("../middleware/authenticate")

router.get("/",authenticate,adminController.getAllorders);
router.put(":/orderId/confirmed",authenticate,adminController.confirmedorder)
router.put(":/orderId/ship",authenticate,adminController.shiporder)
router.put(":/orderId/deliverd",authenticate,adminController.deliverdorders)
router.put(":/orderId/cancel",authenticate,adminController.cancelorders)
router.put(":/orderId/delete",authenticate,adminController.deleteorderforadmin)


module.exports = router ;  