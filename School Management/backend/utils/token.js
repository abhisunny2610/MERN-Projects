const jwt = require("jsonwebtoken")

const generateToken = (user) => {
    try {
        const payload = {
            email: user.email, username: user.username, _id: user._id, role: user.role
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "3d" })
        return token
    } catch (error) {
        throw new Error("Token generation failed")
    }
}

const isTokenIncluded = (req) => {
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
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