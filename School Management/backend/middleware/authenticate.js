const expressAsyncHandler = require("express-async-handler");
const { isTokenIncluded, getAccessToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = expressAsyncHandler(async (req, res, next)=> {
    if(!isTokenIncluded(req)){
        return res.status(401).send("Unauthorized no token provided")
    }

    try {
        const token = getAccessToken(req)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await User.findOne({ email: decoded.email })
        if(!user){
            return res.status(401).send("Unauthorized: Invalid token")
        }
        req.user = user
        next()
    } catch (error) {
        console.error("Error occurred while authenticate user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

module.exports = authenticateUser