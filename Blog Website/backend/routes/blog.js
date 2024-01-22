const { Router } = require('express')
const { handleAddBlog, handleDeleteBlog, handleGetAllBlog, handleGetSingleBlog } = require('../controllers/blog')
const { authenticateToken } = require('../services/auth')

const route = Router()

route.post('/', authenticateToken, handleAddBlog)
route.delete('/:id', authenticateToken, handleDeleteBlog)
route.get('/', handleGetAllBlog)
route.get('/:id', handleGetSingleBlog)

module.exports = route