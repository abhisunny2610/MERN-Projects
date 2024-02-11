const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")

const generateToken = expressAsyncHandler(async (user) => {
    const payload = {
        id: user._id,
        name: user.firstName + " " + user.lastName,
        email: user.email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
    return token
})

const isTokenIncluded = (req) => {
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    );
};

const getAccessTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer")) {
        const access_token = authorization.split(" ")[1];
        return access_token;
    }

    return null;
};

module.exports = { generateToken, isTokenIncluded, getAccessTokenFromHeader }