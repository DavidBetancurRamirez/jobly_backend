const { access, refresh } = require('./jwt')

const login = async (User, res, status) => {
    const roles = Object.values(User.roles).filter(Boolean);
    const username = User.username
    // create JWTs
    const accessToken = access(username, roles)
    const refreshToken = refresh(username)

    // Saving refreshToken with current user
    User.refreshToken = refreshToken;
    
    const result = await User.save();
    console.log(result);

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send authorization roles and access token to user
    res.status(status).json({ username, roles, accessToken });
}

module.exports = login;