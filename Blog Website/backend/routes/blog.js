const { Router } = require('express')
const { handleAddBlog, handleDeleteBlog, handleGetAllBlog, handleGetSingleBlog, handleOurBlogs } = require('../controllers/blog')
const { authenticateToken } = require('../services/auth')

const route = Router()

route.get('/ourBlogs', authenticateToken, handleOurBlogs)
route.post('/', authenticateToken, handleAddBlog)
route.delete('/:id', authenticateToken, handleDeleteBlog)
route.get('/', handleGetAllBlog)
route.get('/:id', handleGetSingleBlog)


module.exports = route