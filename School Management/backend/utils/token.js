const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const generateToken = expressAsyncHandler(async (user) => {
    try {
        const payload = {
            email: user.email, username: user.username
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })
        return token
    } catch (error) {
        throw new Error("Token generation failed")
    }
})

const isTokenIncluded = (req) => {
    return (
        req.authorization && req.authorization.startsWith("Bearer")
    )
}

const getAccessToken = (req) => {
    const authorization = req.headers.authorization

    if (authorization && authorization.startsWith("Bearer")) {
        const access_token = authorization.split(" ")[1];
        return access_token
    }

    return null
}

module.exports = { generateToken, getAccessToken, isTokenIncluded }