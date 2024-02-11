const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const { generateToken } = require("../utils/auth/token")

// for register
const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber, type } = req.body

    // check all the fileds 
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ error: "Please filled all the fields." })
    }

    try {
        let user = await User.findOne({ email })
        // if email already register give error
        if (user) {
            return res.status(400).json({ error: "User already exists" })
        }

        user = new User({
            firstName, lastName, email, password, phoneNumber, type
        })
        // save the user to database
        await user.save()
        const token = await generateToken(user)
        return res.status(201).json({ msg: "User successfully created", token: token })
    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

module.exports = { register }