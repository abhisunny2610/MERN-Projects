const expressAsyncHandler = require("express-async-handler");
const Class = require("../models/classes");

const createClass = expressAsyncHandler(async (req, res) => {
    try {
        const { className, classTeacher } = req.body;
        const existingClass = await Class.findOne({ className: className });
        if (existingClass) {
            return res.status(400).json({ message: "Class Already Exists" });
        }

        const teacherClasses = await Class.find({ classTeacher: classTeacher });
        if (teacherClasses.length > 0) {
            return res.status(400).json({ message: "Teacher is already associated with a class" });
        }

        await Class.create({ className: className, classTeacher: classTeacher });
        return res.status(200).json({ message: "Class created successfully" });

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const fetchSingleClassDetails = expressAsyncHandler(async (req, res) => {
    try {
        const classId = req.params.id

        const singleClass = await Class.findById(classId)
            .populate('classTeacher')
            .populate('students')
            .populate('teachers')

        if (!singleClass) return res.status(400).json({ message: "Class not found" })

        return res.json.status(200).json({ message: "Single Class SuccessFully Fetched", singleClass })

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const updateClassDetails = async (req, res) => {
    try {
        const classId = req.params.id;
        const updatedDetails = req.body;

        if (!classId) {
            return res.status(400).json({ message: 'Class ID is required' });
        }
        const updatedClass = await Class.findByIdAndUpdate(classId, updatedDetails, { new: true });

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        return res.status(200).json({ message: 'Class details updated successfully', data: updatedClass });
    } catch (error) {
        console.error('Error updating class details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { createClass, fetchSingleClassDetails, updateClassDetails }