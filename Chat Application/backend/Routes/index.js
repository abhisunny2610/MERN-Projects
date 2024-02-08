const express = require("express")
const router = express.Router()

const authRoutes = require("./auth")
const chatRoutes = require('./chat')
const messageRoues = require('./message')

router.use('/api/auth', authRoutes)
router.use('/api/chat', chatRoutes)
router.use('/api/message', messageRoues)


module.exports = router