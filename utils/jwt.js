const jwt = require('jsonwebtoken');

const access = (username, roles) => {
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": username,
                "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10min' }
    );

    return accessToken;
}

const refresh = (username) => {
    const refreshToken = jwt.sign(
        { "username": username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    return refreshToken;
}

module.exports = { access, refresh };