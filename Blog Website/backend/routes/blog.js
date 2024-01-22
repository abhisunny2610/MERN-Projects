const { Router } = require('express')
const { handleAddBlog, handleDeleteBlog, handleGetAllBlog } = require('../controllers/blog')
const { authenticateToken } = require('../services/auth')

const route = Router()

route.post('/', authenticateToken, handleAddBlog)
route.delete('/:id', authenticateToken, handleDeleteBlog)
route.get('/', handleGetAllBlog)

module.exports = route