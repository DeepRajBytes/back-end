const jwtgenerator = require('../config/jwtprovider');
const userservice = require('../services/user.service');
const cartService = require('../services/cart.service');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
        try {
            const user = await userservice.createUser(req.body);

            if(!user){
                throw new Error("user alredy present")
            }

        const JWT = await jwtgenerator.generatetoken(user._id);
        await cartService.createCart(user);
        return res.status(200).send({ JWT, message: "Register Success" });
        
        } catch (error) {
            // console.log(error)
            return res.status(400).send(error)
            // return res.status(400).send({message:"user exist"})
        }
        
    
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userservice.finduserbyemail(email);
        if (!user) {
            return res.status(404).send({ message: "User does not exist, please Signup" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).send({ message: "Wrong Password" });
        }
        const JWT = await jwtgenerator.generatetoken(user._id); // Corrected here
        return res.status(200).send({ JWT, message: "Successful login" });
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong while logging in" });
    }
};

module.exports = { register, login };

