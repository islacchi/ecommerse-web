const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const url = req.url;
    console.log(`this url: ${url}`);
    const authHeader = req.headers.authorization || req.headers.Authorization ;
    if (!authHeader) {
        if(url == "/home" || url == "/prods" || url == "/productadd" || url == "/createprod" || url == "/writeData" ||url == "/products"){
            return res.status(401).json({success : false, message : "No auth header"}); //no auth header
            }
           return res.status(401).json({error:"Unauthorized Access: No token found!"});
    }
    //console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err){
             if(url == "/home" || url == "/prods" || url == "/productadd" || url == "/createprod" || url == "/writeData" ){
                console.log(err);
                return res.status(403).json({success : false, message : "Expired Auth Token"}); //invalid token
                }
                return res.status(403).json({message:"Unauthorized Access: Token Expired or Invalid Token!"}); //invalid token
                
             }
            req.user = decoded.username;
            console.log("Passed JWT token validation!")
            next();
        } 
    );
}

module.exports = verifyJWT