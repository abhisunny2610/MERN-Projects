const asyncHandler = require("express-async-handler")
const User = require("../models/user")
const { generateToken } = require("../utils/auth/token")
const bcrypt = require("bcrypt")
const Agent = require("../models/agent")

// for register
const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, phoneNumber, type } = req.body

    // check all the fileds 
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ error: "Please fill all the fields." })
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

        if (type === "agent") {
            const agent = new Agent({
                user: user._id
            })

            await agent.save()
        }

        const token = await generateToken(user)
        return res.status(201).json({ msg: "User successfully created", token: token })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Server Error")
    }
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email && !password) {
        return res.status(400).json({ msg: "Please fill all the fields." })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "User not found" })
        }

        const validatePassword = bcrypt.compare(password, user.password)

        if (validatePassword) {
            const token = await generateToken(user)
            return res.status(200).json({ msg: "User successfully login", token: token })
        }

    } catch (error) {
        return res.status(500).send("Server Error")
    }
})

module.exports = { register, login }