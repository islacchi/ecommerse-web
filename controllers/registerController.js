const User = require('../model/User.js');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password, roles } = req.body;
   ///const user = req.body.username;
    //const pwd = req.body.password;
    //console.log(req);
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({username: username}).exec();

    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "username": username,
            "password": hashedPwd,
            "roles"   : roles
             
        });

        console.log(result);


        res.status(201).json({ 'message': `New user ${username} created!`,'success' : true });
        //res.status(201).render('sign-in.ejs');

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };