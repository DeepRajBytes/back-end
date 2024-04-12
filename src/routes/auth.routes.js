const express = require('express');
const router = express.Router();
const authController = require('../contoller/auth.controller'); 
const authenticate = require('../middleware/authenticate')

router.post('/signup', authController.register);
router.post('/signin',authController.login);

module.exports = router;
