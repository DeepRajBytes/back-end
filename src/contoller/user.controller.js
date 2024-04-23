const { JsonWebTokenError } = require('jsonwebtoken');
const userservice = require('../services/user.service');
const user = require('../models/user.model');

const getuserprofile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if (!jwt) {
            return res.status(500).send({ error: "JWT verification Failed" });
        }
        const user = await userservice.finduserbytoken(jwt);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const getallusers = async(req,res) =>{
    try {
        const users =await userservice.getalluser();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message}); 
    }
}


const getuserprofilebyid = async (req, res) => {
    const user = req.user
    const UserId = user._id
    try {
        const user = await userservice.finduserbyid(UserId);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

};
const updateuserprofile = async (req, res) => {
    const user = req.user;
    const userId = user._id;
    const updatedUserData = req.body;

    try {
        const updatedUser = await userservice.updateUser(userId, updatedUserData);
        return res.status(200).send(updatedUser);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const wishlist = async (req, res) => {
    const user = req.user
    const UserId = user._id
    
    try {
        const user = await userservice.wishlist(UserId);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }

};
module.exports = {getuserprofile , getallusers , getuserprofilebyid ,updateuserprofile,wishlist}