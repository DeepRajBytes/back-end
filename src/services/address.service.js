const User = require("../models/user.model");
const Address = require("../models/address.model");

async function createaddress(userId, reqData) {
    try {
        // Find the user
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User does not exist");
        }
        // Create the address
        const address = new Address(reqData);
        address.user = userId;
        await address.save();

        // Add the address to the user's addresses array
        user.address.push(address);
        await user.save();
        return user;
    } catch (error) {
        throw error; // Forward the error to the caller
    }
}

module.exports = { createaddress };
