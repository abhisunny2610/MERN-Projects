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

module.exports = generateToken