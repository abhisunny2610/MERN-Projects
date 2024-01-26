const Auth = require('../models/auth')
const { createTokenForUser } = require("../services/auth");
const bcrypt = require('bcrypt');

const handleSignUp = async (req, res) => {

    try {
        const { name, email, password } = req.body

        const userExists = await Auth.findOne({ email })

        if (userExists) {
            res.status(404)
            throw new Error("User Already Exists")
        }

        const user = await Auth.create({ name, email, password })

        if (user) {
            res.status(201).json({
                _id: user._id, name: user.name, email: user.email
            })
        } else {
            res.status(400)
            throw new Error("Something wents wrong.")
        }

    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

}


const handleSignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Auth.findOne({ email }, { _id: 1, email: 1, password: 1 })

        if (!user) {
            throw new Error("User not found")
        }

        const validPassowrd = await bcrypt.compare(password, user.password)
        if (!validPassowrd) {
            throw new Error("Invalid username or password")
        }

        const token = createTokenForUser(user)
        return res.json({ status: 'ok', token: token })
        // return res.cookie("token",token)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const handlePrivateData = async(req,res,next)=> {
    return res.status(200).json({
        success:true,
        message: 'You got access to the private data in this route',
        user: req.user
    })
}

module.exports = { handleSignIn, handleSignUp, handlePrivateData }