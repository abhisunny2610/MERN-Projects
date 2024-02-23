const expressAsyncHandler = require("express-async-handler");
const Notice = require("../models/notice");

const addNotice = expressAsyncHandler(async (req, res) => {
    const { content } = req.body
    try {
        if (req.user.role === "admin" || req.user.role === "teacher") {
            const newNotice = await Notice.create({
                content: content,
                publishedBy: req.user._id
            })
            await newNotice.populate('publishedBy', 'username')
            return res.status(201).json({ message: "Notice added successfully", newNotice })
        }
    } catch (error) {
        console.log("Error occur in add notice", error)
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

const getAllNotice = expressAsyncHandler(async (req, res) => {
    try {
        const notices = await Notice.find().populate({
            path: "publishedBy",
            select: "username"
        })
        if (!notices) return res.status(404).send("No notice found...")
        return res.status(200).json({ notices })
    } catch (error) {
        console.log("Error occur in getting notice", error)
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

const deleteNotice = expressAsyncHandler(async (req, res) => {
    try {
        const noticeId = req.params.id
        if (req.user.role === "admin") {
            const deletedNotice = await Notice.findByIdAndDelete(noticeId)
            if (!deletedNotice) {
                return res.status(404).send("Notice not found")
            }
            return res.status(200).send("Notice successfully deleted")
        } else {
            return res.status(400).send("User not authorized")
        }
    } catch (error) {
        console.log("Error occur in delete notice", error)
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

const updateNotice = expressAsyncHandler(async (req, res) => {
    const { content } = req.body
    try {
        const noticeId = req.params.id

        if (req.user.role === "admin") {
            const updatedNotice = await Notice.findByIdAndUpdate(noticeId, { content: content }, { new: true })
            if (!updatedNotice) {
                return res.status(404).send("Notice not found")
            }
            return res.status(200).json({ messgae: "Notice successfully updated", updatedNotice })
        } else {
            return res.status(400).send("User not authorized")
        }
    } catch (error) {
        console.log("Error occur in update notice", error)
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

const getNoticeById = expressAsyncHandler(async (req, res) => {
    try {
        const noticeId = req.params.id
        const notice = await Notice.findById(noticeId).populate("publishedBy", "username")
        if (!noticeId) {
            return res.status(404).send("Notice not found")
        }
        return res.status(200).json({ notice })
    } catch (error) {
        console.log("Error occur in single notice", error)
        return res.status(500).send("Internal Server Error. Please try again later.");
    }
})

module.exports = { addNotice, getAllNotice, deleteNotice, updateNotice, getNoticeById }