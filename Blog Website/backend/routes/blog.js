const {Router} = require('express')
const { handleAddBlog, handleDeleteBlog } = require('../controllers/blog')

const route = Router()

route.post('/', handleAddBlog)
route.delete('/:id', handleDeleteBlog)

module.exports = route