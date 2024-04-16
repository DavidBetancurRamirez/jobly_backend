const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { access } = require('../utils/jwt')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            const username = decoded.username
            if (err || foundUser.username !== username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);
            const accessToken = access(username, roles);
            res.json({ username, accessToken, roles })
        }
    );
}

module.exports = { handleRefreshToken }