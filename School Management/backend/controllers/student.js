const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Student = require("../models/student");
const generatePassword = require("../utils/generatePassword");

const registerStudent = expressAsyncHandler(async (req, res) => {
    const { name, email, phone, gender, std, dateOfBirth } = req.body;

    if (!name || !email || !gender || !std || !dateOfBirth) {
        return res.status(400).send("Please fill all the mandatory fields");
    }

    try {
        const user = await User.findOne({ email })
        if (user) return res.status(400).send("User already exists")

        const studentpassword = generatePassword(name, dateOfBirth)
        const newUser = await User.create({ 
            username: name, 
            email: email, 
            password: studentpassword, 
            role: "student" })
            
        const newStudent = await Student.create({
            name: name,
            email: email,
            contact: {
                phone: phone
            },
            gender: gender,
            std: std,
            dateOfBirth: dateOfBirth
        });

        return res.status(201).send("Student successfully created.")

    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }

})

const updateStudent = expressAsyncHandler(async (req, res)=> {
    const {id} = req.params.id
})

module.exports = { registerStudent, updateStudent }