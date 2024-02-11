const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { isTokenIncluded, getAccessTokenFromHeader } = require('../utils/auth/token');

const authenticateUserMiddleware = async (req, res, next) => {

    // Check if the request contains a token in the headers or query params
    if (!isTokenIncluded(req)) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const token = getAccessTokenFromHeader(req)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({ error: 'Unauthorized: Invalid tokens' });
    }
};

module.exports = authenticateUserMiddleware;
