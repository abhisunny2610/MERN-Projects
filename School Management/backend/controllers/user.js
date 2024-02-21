const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/token");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

const register = expressAsyncHandler(async (req, res) => {
    const { username, email, role, password } = req.body

    if (!username || !email || !role || !password) {
        return res.status(400).send("Please fill all the required fields")
    }

    try {
        const user = await User.create({
            username, email, role, password
        })

        // for student
        if (role === "student") {
            const student = await Student.create({
                name:username, email:email
            })
        }

        // for teacher
        if (role === "teacher") {
            const student = await Teacher.create({
                name:username, email:email
            })
        }
        return res.status(201).send("User account successfully created.")
    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

const login = expressAsyncHandler(async (req, res) => {
    const { email, role, password } = req.body

    if (!email || !role || !password) {
        return res.status(400).send("Please fill all the required fields")
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).send("User not found")
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (passwordMatch) {
                const token = await generateToken(user)
                return res.status(200).json({ token })
            } else {
                return res.status(401).send("Username or password is incorrect")
            }
        }
    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

module.exports = { register, login }