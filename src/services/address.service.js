const User = require("../models/user.model");
const Addresss = require("../models/address.model");

async function createaddress(userId, reqData) {
    try {
        // Find the user
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User does not exist");
        }
        // Create the address
        const address = new Addresss(reqData);
        address.user = userId;
        await address.save();

        // Add the address to the user's addresses array
        user.address.push(address);
        await user.save();
        return user;
    } 
    catch (error) {
        throw error; 
    }
}


async function updateaddress(userId, reqData) {
    try {
        
        const { Name, Mobile, City, Pincode, NearBy, Address } = reqData.reqdata;

       
        const user = await User.findById(userId).populate("address");

        
        if (!user) {
            throw new Error("User not found");
        }

       
        const address = await Addresss.findById(reqData.id);

        
        if (!address) {
            throw new Error("Address not found");
        }

        
        address.Name = Name;
        address.Mobile = Mobile;
        address.City = City;
        address.Pincode = Pincode;
        address.NearBy = NearBy;
        address.Address = Address;

        const updatedAddress = await address.save();

        

       const updateuser =  await user.save();

        
        return updatedAddress;

    } catch (error) {
       
        console.error("Error updating address:", error);
        throw error;
    }
}



module.exports = { createaddress,updateaddress};
