const Blog = require("../models/blog")

const handleAddBlog = async (req, res) => {
    const { title, content } = req.body

    try {
        const newBlog = await Blog.create({
            title, content, author: req.user._id
        })

        return res.status(201).json({
            success: true,
            message: "New Blog successfully added",
            data: newBlog
        })

    } catch (error) {
        throw new Error(error)
    }

}

const handleDeleteBlog = async () => {

}

const handleGetAllBlog = async (req, res) => {
    const blogs = await Blog.find({})
    return res.status(200).json(
        {
            success: true,
            count: blogs.length,
            data: blogs
        })
}

module.exports = { handleAddBlog, handleDeleteBlog, handleGetAllBlog }