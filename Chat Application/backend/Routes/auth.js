const express = require('express')
const { login, signup, allUsers } = require('../Controllers/auth')
const { protect } = require('../MiddleWare/autheorised')
const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/allUsers', protect, allUsers)

module.exports = router