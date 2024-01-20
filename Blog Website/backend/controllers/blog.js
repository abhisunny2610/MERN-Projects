const Blog = require("../models/blog")

const handleAddBlog = async()=> {

}

const handleDeleteBlog = async()=> {
    
}

const handleGetAllBlog = async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
}

module.exports = {handleAddBlog, handleDeleteBlog, handleGetAllBlog}