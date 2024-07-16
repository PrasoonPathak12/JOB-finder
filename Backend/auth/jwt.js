const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtAuthMiddleware = async (req, res, next) => {
    // extract the token from cookies
    const { jwt_token } = req.cookies;
    if(!jwt_token) {
        return res.status(401).json({ error: 'Unauthorized, token not found' });
    }

    try {
        // verification of token
        const decodedPayload = jwt.verify(jwt_token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decodedPayload.id);
        next();
    } catch(err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const generateJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

module.exports = { jwtAuthMiddleware, generateJWT };