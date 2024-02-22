const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const Teacher = require("../models/teacher");

const registerTeacher = expressAsyncHandler(async (req, res)=> {
    const {name, email, salary, gender, qualification, subjects, phone, dateOfBirth} = req.body
    if(!name || !email) return res.status(400).send("Please fill all the mediatory fields.")

    try {
        const user = await User.findOne({email})
        if(user) return res.status(400).send("User already exits")

        
        const teacherPassword = name + "@teacher" + dateOfBirth
        const newUser = await User.create({ 
            username: name, 
            email: email, 
            password: teacherPassword, 
            role: "teacher" })
            
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
            dateOfBirth: dateOfBirth
        });

        return res.status(201).send("Teacher successfully created.")

    } catch (error) {
        console.error("Error occurred while creating user:", error);
        return res.status(500).send("Internal Server Error. Please try again later.");
    }

})

module.exports = {registerTeacher}