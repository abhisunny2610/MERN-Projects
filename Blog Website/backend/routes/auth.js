const {Router} = require('express')
const { handleSignUp, handleSignIn, handlePrivateData } = require('../controllers/auth')
const { authenticateToken } = require('../services/auth')

const route = Router()

route.post('/signup', handleSignUp)
route.post('/signin', handleSignIn)
route.get('/private', authenticateToken ,handlePrivateData)

module.exports = route