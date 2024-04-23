const users = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwtprovider = require('../config/jwtprovider');

const createUser = async (userdata) => {
    try {
        const { firstname, secondname, password, email ,mobile} = userdata;
        const isUserExist = await users.findOne({ email });

        if (isUserExist) {
            throw new Error("User already exists with email: " + email);
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await users.create({
            firstname,
            secondname,
            password: hashedPassword, // Use hashed password instead of email
            email,
            mobile
        });

        // console.log("User created successfully", user);
        return user;
    } 
    catch (error) {
        
        // if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        //     throw new Error("Email address is already in use");
        // }
        return error;
    }
    };


const finduserbyid = async(userId) =>{
    try {
        const user = await users.findById(userId).populate("address");
        if(!user){
            throw new Error("User does not found"); 
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const finduserbyemail = async(email) =>{
    try {
        const user = await users.findOne({email})
        if(!user){
            throw new Error("User does not Exist"); // Capitalized Error
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const finduserbytoken = async(token) =>{
   try {
    const userid = jwtprovider.findIDbyToken(token);
    const user = await finduserbyid(userid);

    if(!user){
        throw new Error("user not found with id")
    }
    return user ;
    

  } catch (error) {
    throw new Error(error.message);
   }
}

const  getalluser = async () => {
    try {
        const allUsers = await users.find({});
        return allUsers;
    } catch (error) {
        throw new Error(error.message);
    }
};
const updateUser = async (userId, updatedUserData) => {
    try {
        const { firstname, secondname, email, mobile } = updatedUserData;

        const user = await users.findById(userId).populate("address");

        if (!user) {
            throw new Error("User not found");
        }

        user.firstname = firstname;
        user.secondname = secondname;
        user.email = email;
        user.mobile = mobile;

        const updatedUser = await user.save();

        return updatedUser;
    } catch (error) {
        throw new Error("Error updating user: " + error.message);
    }
};

const wishlist= async(userid) => {
    try {
        const user = await users.findById(userid).populate("wishlist");
        if(!user){
            throw new Error("User does not found"); 
        }
        return user.wishlist;
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = {
    createUser,
    finduserbyid,
    finduserbyemail,
    finduserbytoken,
    getalluser,
    updateUser,
    wishlist
    
}