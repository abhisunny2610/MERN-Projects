const {Router} = require('express')
const { handleAddBlog, handleDeleteBlog, handleGetAllBlog } = require('../controllers/blog')

const route = Router()

route.post('/', handleAddBlog)
route.delete('/:id', handleDeleteBlog)
route.get('/', handleGetAllBlog)

module.exports = route