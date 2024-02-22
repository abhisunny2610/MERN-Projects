const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Teacher = require("../models/teacher");
const generatePassword = require("../utils/generatePassword");
const { calculateAge } = require("../utils/helper");

const registerTeacher = expressAsyncHandler(async (req, res) => {
    const { name, email, salary, gender, qualification, subjects, phone, dateOfBirth } = req.body
    if (!name || !email) return res.status(400).send("Please fill all the mediatory fields.")

    try {
        const user = await User.findOne({ email })
        if (user) return res.status(400).send("User already exits")

        const age = calculateAge(dateOfBirth)
        const teacherPassword = generatePassword(name, dateOfBirth)
        const newUser = await User.create({
            username: name,
            email: email,
            password: teacherPassword,
            role: "teacher"
        })

        const newTeacher = await Teacher.create({
            name: name,
            email: email,
            contact: {
                phone: phone
            },
            subjects: subjects,
            qualification: qualification,
            salary: salary,
            gender: gender,
            dateOfBirth: dateOfBirth,
            age: age
        });

        return res.status(201).send("Teacher successfully created.")

    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }

})


const updateTeacher = expressAsyncHandler(async (req, res) => {
    try {
        const teacherId = req.params.id
        if (!teacherId) {
            return res.status(403).send("Teacher not found")
        }

        if (req.user.role === "admin") {
            const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, req.body, { new: true })
            return res.status(200).json({ message: "Teacher updated successfully", updatedTeacher })
        }
    } catch (error) {
        console.log("Error occured while updating teacher", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

const deleteTeacher = expressAsyncHandler(async(req, res)=> {
    try {
        const teacherId = req.params.id
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId)
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        return res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.log("Error occured while deleting teacher", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = { registerTeacher, updateTeacher, deleteTeacher }