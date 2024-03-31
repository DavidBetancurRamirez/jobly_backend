const User = require('../model/User');
const bcrypt = require('bcrypt');
const login = require('../utils/login');

const handleLogin = async (req, res) => {
    const { username, pwd } = req.body;
    if (!username || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        await login(foundUser, res, 200)
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };