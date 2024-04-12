const jwt = require('jsonwebtoken');
const SECRET_KEY = "deeprajsenchouhan"

const generatetoken = async(userid) =>{

    const token = jwt.sign({userid:userid},SECRET_KEY,{expiresIn:'24hours'});
    return token;
}

const findIDbyToken = (token) =>{
    const decodetoken = jwt.verify(token , SECRET_KEY);
    return decodetoken.userid;
}

module.exports = {generatetoken,findIDbyToken}