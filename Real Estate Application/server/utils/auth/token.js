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


module.exports = { generateToken }