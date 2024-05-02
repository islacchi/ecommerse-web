
const User = require('../model/User.js');
const jwt = require('jsonwebtoken');

const handleHomeQuery = async (req, res) => {
    
   const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
 
    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log(foundUser);
    if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 

            res.render("admin.ejs");
        }
    );
 
}

const handleProdQuery = async (req, res) => {
    
    const cookies = req.cookies;
     if (!cookies?.jwt) return res.sendStatus(401);
     const refreshToken = cookies.jwt;
  
     const foundUser = await User.findOne({ refreshToken }).exec();
     if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
     if (!foundUser) return res.sendStatus(403); //Forbidden 
     // evaluate jwt 
     jwt.verify(
         refreshToken,
         process.env.REFRESH_TOKEN_SECRET,
         (err, decoded) => {
             if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
             
             res.render("products.ejs");
         }
     );
    }
     const handleAddProdQuery = async (req, res) => {
    
        const cookies = req.cookies;
         if (!cookies?.jwt) return res.sendStatus(401);
         const refreshToken = cookies.jwt;
      
         const foundUser = await User.findOne({ refreshToken }).exec();
         if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
         if (!foundUser) return res.sendStatus(403); //Forbidden 
         // evaluate jwt 
         jwt.verify(
             refreshToken,
             process.env.REFRESH_TOKEN_SECRET,
             (err, decoded) => {
                 if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                 
                 res.render("add-product.ejs");
             }
         );
  
    }
    const handleCreateProdQuery = async  (req, res, next) => {

        const cookies = req.cookies;
         if (!cookies?.jwt) return res.sendStatus(401);
         const refreshToken = cookies.jwt;
      
         const foundUser = await User.findOne({ refreshToken }).exec();
         if(foundUser ==null || foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
         if (!foundUser) return res.sendStatus(403); //Forbidden 
         // evaluate jwt 
         jwt.verify(
             refreshToken,
             process.env.REFRESH_TOKEN_SECRET,
             (err, decoded) => {
                 if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                 console.log("Passed Cookie Check");
                 console.log(req.body);
                 next();

             }
         );
  
    }

    const handleAccountDetailsQuery = async  (req, res, next) => {

        const cookies = req.cookies;
         if (!cookies?.jwt) return res.sendStatus(401);
         const refreshToken = cookies.jwt;
      
         const foundUser = await User.findOne({ refreshToken }).exec();
         if(foundUser ==null || foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
         if (!foundUser) return res.sendStatus(403); //Forbidden 
         // evaluate jwt 
         jwt.verify(
             refreshToken,
             process.env.REFRESH_TOKEN_SECRET,
             (err, decoded) => {
                 if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
                 console.log("Passed Cookie Check");
                 res.render("accounts.ejs");

             }
         );
  
    }

    
 
    
 

module.exports = { handleHomeQuery, handleProdQuery, handleAddProdQuery, handleCreateProdQuery, handleAccountDetailsQuery }