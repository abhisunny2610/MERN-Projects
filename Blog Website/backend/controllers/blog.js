const Blog = require("../models/blog")


const handleOurBlogs = async (req, res) => {

    try {
        const userId = req.user._id

        const userBlogs = await Blog.dinf({ author: userId })

        if (userBlogs.length === 0) {
            return res.status(400).json({ message: "No blogs found for this user" })
        }

        return res.status(200).json({ blogs: userBlogs })

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


const handleAddBlog = async (req, res) => {
    const { title, content, category } = req.body

    try {
        const newBlog = await Blog.create({
            title, content, category, author: req.user._id
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

const handleDeleteBlog = async (req, res) => {
    const id = req.params.id

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            throw new Error("Blog does not exit")
        }

        await blog.remove()

        return res.status(200).json({
            success: true,
            message: 'Story deleted'
        })


    } catch (error) {
        throw new Error(error)
    }
}

const handleGetAllBlog = async (req, res) => {
    try {
        const blogs = await Blog.find({})
        return res.status(200).json(
            {
                success: true,
                count: blogs.length,
                data: blogs
            })
    } catch (error) {
        throw new Error(error)
    }
}

const handleGetSingleBlog = async (req, res) => {
    const id = req.params.id

    try {
        const blog = await Blog.findById(id)
        if (!blog) {
            throw new Error("Blog does not exist")
        }
        return res.status(200).json({
            success: true,
            data: blog
        })

    } catch (error) {
        throw new Error(error)
    }


}

module.exports = { handleOurBlogs, handleAddBlog, handleDeleteBlog, handleGetAllBlog, handleGetSingleBlog }