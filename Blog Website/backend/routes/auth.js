const {Router} = require('express')
const { handleSignUp, handleSignIn } = require('../controllers/auth')

const route = Router()

route.post('/signup', handleSignUp)
route.post('/signin', handleSignIn)
route.get

module.exports = route