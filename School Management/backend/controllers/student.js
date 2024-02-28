const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Student = require("../models/student");
const generatePassword = require("../utils/generatePassword");
const { calculateAge, generateRandomId } = require("../utils/helper");

const registerStudent = expressAsyncHandler(async (req, res) => {
    const { name, email, phone, gender, std, dateOfBirth } = req.body;

    if (!name || !email || !gender || !std || !dateOfBirth) {
        return res.status(400).send("Please fill all the mandatory fields");
    }

    try {
        const user = await User.findOne({ email })
        if (user) return res.status(400).send("User already exists")
        const age = calculateAge(dateOfBirth)
        const studentId = generateRandomId()
        const studentpassword = generatePassword(name, dateOfBirth)
        const newUser = await User.create({
            username: name,
            email: email,
            password: studentpassword,
            role: "student"
        })

        const newStudent = await Student.create({
            name: name,
            email: email,
            contact: {
                phone: phone
            },
            gender: gender,
            std: std,
            dateOfBirth: dateOfBirth,
            age: age,
            studentId: studentId
        });

        return res.status(201).json({message:"Student successfully created."})

    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }

})

const getSingleStudent = expressAsyncHandler(async (req, res) => {
    try {
        const studentId = req.params.id
        const student = await Student.findById(studentId)
        if (!student) return res.status(404).send("Student not found")
        return res.status(200).json({ student })
    } catch (error) {
        console.error("Error occured while fetching single student", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

const getAllStudent = expressAsyncHandler(async (req, res) => {
    try {
        const students = await Student.find()
        return res.status(200).json({ students })
    } catch (error) {
        console.error("Error occured while fetching students", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})

const updateStudent = expressAsyncHandler(async (req, res) => {

    try {
        const studentId = req.params.id
        if (!studentId) {
            return res.status(403).send("Student not found")
        }
        const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true })
        return res.status(200).json({ message: "Student updated successfully", updatedStudent })
    } catch (error) {
        console.error("Error occured while updating the student", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

})

const deleteStudent = expressAsyncHandler(async (req, res) => {
    try {
        const studentId = req.params.id
        const deletedStudent = await Student.findByIdAndDelete(studentId)
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const deletedUser = await User.findOneAndDelete({ email: deletedStudent.email })
        if (!deletedUser) return res.status(400).send("User not found")

        return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.log("Error occured while deleting student", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
})


module.exports = { registerStudent, getSingleStudent, getAllStudent,updateStudent, deleteStudent, recentFiveTeachers }