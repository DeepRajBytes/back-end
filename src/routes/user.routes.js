const express = require('express')
const router = express.Router();
const userController = require('../contoller/user.controller');
const authenticated = require('../middleware/authenticate');

router.get("/profile",userController.getuserprofile);

router.get("/profile/id",authenticated,userController.getuserprofilebyid);

router.get("/",userController.getallusers);

router.put("/profile/update", authenticated, userController.updateuserprofile);

router.get("/wishlist",authenticated,userController.wishlist)


module.exports = router ; 