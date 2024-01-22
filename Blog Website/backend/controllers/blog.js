const Blog = require("../models/blog")

const handleAddBlog = async(req, res)=> {
    const {title, content} = req.body

    const blog = await Blog.create({
        title, content
    })

}

const handleDeleteBlog = async()=> {
    
}

const handleGetAllBlog = async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
}

module.exports = {handleAddBlog, handleDeleteBlog, handleGetAllBlog}