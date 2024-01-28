const User = require("../Models/UserModel")
const generateToken = require("../Utils/generateToken")
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
    const { name, email, password, profileImage } = req.body

    try {
        // check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Please Enter all the Fields" })
        }

        // check if user with the provided email already exists
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ error: "User email already exists." })
        }

        // create a new user
        const newUser = await User.create({
            name, email, password, profileImage
        })
        if (newUser) {
            return res.status(201).json({ message: "User created successfully", token: generateToken(newUser._id) })
        } else {
            return res.status(500).json({ error: "Failed to create user" })
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }

}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // check user with provided email is exists or not
        const user = await User.findOne({ email })

        const validatePassword = await bcrypt.compare(password, user.password)

        // if user exists
        if (user && validatePassword) {
            return res.status(200).json({ message: "User login successfullty", token: generateToken(user._id) })
        } else {
            return res.status(401).json({ error: "Invalid Email or Password" })
        }

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ error: "Internal server error." })
    }
}

const allUsers = async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
    return res.status(200).json({users: users})
}

module.exports = { signup, login, allUsers }