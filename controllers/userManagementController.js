
const User = require('../model/User.js');
const jwt = require('jsonwebtoken');

const handleUserListQuery = async (req, res) => {
    
   const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
 
    const foundUser = await User.findOne({ refreshToken }).exec();
    //console.log(foundUser);
    if(foundUser ==null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
    const listUser = await User.find().exec();
    console.log("Users Found!");
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); 

            res.send(listUser);
        }
    );
 
}

const handleUpdateUserQuery = async (req, res) => {
    
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
             console.log(req.body);
             res.send(updateCommand(req.body));
         }
     );
    }

 const updateCommand = async (data) => {
        let key = data.selectedUser;
        let changedUsername = data.email;

        //console.log(key + changedUsername);
        
    const updateUser = await User.updateOne( { username: key },
    {
      $set: {
        username: changedUsername
      },
      $currentDate: { lastUpdated: true }
    });
    console.log(updateUser); 
    return updateUser;
    //return ({ message: "HEHEHEHHEHE"});
}


    const handleDeleteUserQuery = async (req, res) => {
    
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
                 res.send(deleteCommand(req.body));
                 
             }
         );
  
    }


    const deleteCommand = async (data) => {
        let key = data.selectedUser;
        let changedUsername = data.email;

        //console.log(key + changedUsername);
        
    const deleteUser = await User.deleteOne( { username: key } );
    console.log(deleteUser); 
    return deleteUser;
    //return ({ message: "HEHEHEHHEHE"});
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

    const handleForgotPassQuery = async (req, res) => {
            let email = req.body.email;
         const foundUser = await User.findOne({username: email }).exec();
         //console.log(foundUser);
         if(foundUser ==null) return res.status(402).json({"message":"User Not Found!"}); //Unauthorized 
          res.status(200).json({message: "Email found!",success: true});
     }

    
 
    
 

module.exports = { handleUserListQuery, handleUpdateUserQuery, handleDeleteUserQuery, handleCreateProdQuery, handleAccountDetailsQuery, handleForgotPassQuery }