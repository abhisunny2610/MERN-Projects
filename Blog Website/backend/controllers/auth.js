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
            throw new Erro("Invalid username or password")
        }

        const token = createTokenForUser(user)
        return res.json({ status: 'ok', token: token })
        // return res.cookie("token",token)
    } catch (error) {
        throw new Error("User not found", error)
    }
}

module.exports = { handleSignIn, handleSignUp }