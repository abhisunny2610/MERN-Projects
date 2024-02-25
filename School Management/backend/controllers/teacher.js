const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Teacher = require("../models/teacher");
const generatePassword = require("../utils/generatePassword");
const { calculateAge, generateRandomId } = require("../utils/helper");

const registerTeacher = expressAsyncHandler(async (req, res) => {
    const { name, email, salary, gender, qualification, subjects, phone, dateOfBirth } = req.body
    if (!name || !email) return res.status(400).json({ message: "Please fill all the mediatory fields." })

    try {
        const user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exits" })

        const age = calculateAge(dateOfBirth)
        const teacherId = generateRandomId()
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
            age: age,
            teacherId: teacherId
        });

        return res.status(201).send("Teacher successfully created.")

    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }

})


const getSingleTeacher = expressAsyncHandler(async (req, res) => {
    try {
        const teacherId = req.params.id
        const teacher = await Teacher.findById(teacherId)
        if (!teacher) return res.status(404).send("Teacher not found")
        return res.status(200).json({ teacher })
    } catch (error) {
        console.error("Error occured while fetching single teacher", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

const getAllTeacher = expressAsyncHandler(async (req, res) => {
    try {
        const teachers = await Teacher.find()
        return res.status(200).json({ teachers })
    } catch (error) {
        console.error("Error occured while fetching teachers", error);
        return res.status(500).json({ message: 'Internal Server Error' });
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

const deleteTeacher = expressAsyncHandler(async (req, res) => {
    try {
        const teacherId = req.params.id
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId)
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const deletedUser = await User.findOneAndDelete({ email: deletedTeacher.email })
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.log("Error occured while deleting teacher", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = { registerTeacher, getSingleTeacher, getAllTeacher, updateTeacher, deleteTeacher }