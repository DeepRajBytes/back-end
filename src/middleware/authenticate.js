const userService = require("../services/user.service");
const jwtprovider = require("../config/jwtprovider");

const authenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            return res.status(404).send({ message: "Authorization header not found" });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(404).send({ message: "Token Not Found" });
        }
        const userid = await jwtprovider.findIDbyToken(token);
        const user = await userService.finduserbyid(userid);
        req.user = user;
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
    next(); 
};

module.exports = authenticated;














































// const userService = require("../services/user.service");
// const jwtprovider = require("../config/jwtprovider");

// const authenticated = async (req, res, next) => {
//     try {
//         const token = req.headers.Authorization?.split(" ")[1];
//         if (!token) {
//             return res.status(404).send({ message: "Token Not Found" });
//         }
//         const userid = await jwtprovider.findIDbyToken(token);
//         const user = await userService.finduserbyid(userid);
//         req.user = user;
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
//     next(); 
// };

// module.exports = authenticated;

















// const userService  = require("../services/user.service")
// const jwtprovider = require("../config/jwtprovider")


// const authenticated = async(req,res,next) =>{
//     try {
//         const token = req.headers.authentication?.split(" ")[1]
//         if(!token){
//            res.status(404).send({message:"Token Not Found"})
//         }
//         const userid = await jwtprovider.findIDbyToken(token);
        
//         const user = await userService.finduserbyid(userid);
//         req.user = user
        
//     } catch (error) {
//         res.status(404).send({error:error.message})
//     }
//     next();

// }
// module.exports =  authenticated 