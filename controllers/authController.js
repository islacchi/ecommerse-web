const User = require('../model/User.js');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
 

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({username: username}).exec();
    if (!foundUser) return res.status(401).json({"message":"Cookie"}); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username, "roles": foundUser.roles },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(accessToken);
        
        res.cookie('jwt', refreshToken ,{ httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken, "expiresIn": "30sec","success":true, username : foundUser.username });
        //res.set('x-token', token);*/
       //console.log(foundUser.username);
        //res.render('index.ejs',{ accessToken, "expiresIn": "30sec",username:foundUser.username });
    } else {
        res.sendStatus(401);
    }
}

const handleLoginAdmin = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({username: username}).exec();
    console.log(foundUser);
    if(foundUser == null ||foundUser.roles!=='Admin') return res.status(401).json({"message":"Unauthorized"}); //Unauthorized 
    if (!foundUser) return res.status(401).json({"message":"No user found"}); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { "username": foundUser.username, "roles": foundUser.roles },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(accessToken);
        
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken, "expiresIn": "30sec","success":true });
        
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin, handleLoginAdmin };