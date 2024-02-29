const jwt = require('jsonwebtoken');
const jwtSecretToken = process.env.JWT_SECRET

exports.createToken = async (username) => {
    const currentTime = Date.now()

    const payload = {
        username: username,
        createdTime: currentTime,
        expirationTime: currentTime + 3600
    };

    return jwt.sign(payload, jwtSecretToken, {expiresIn: payload.expirationTime});
}

exports.getUsernameFromToken = async (token) => {
    try {
        const decoded = jwt.verify(token, jwtSecretToken);
        return decoded.username;
    } catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
};