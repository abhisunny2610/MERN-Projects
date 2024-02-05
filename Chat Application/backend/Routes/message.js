const express = require('express')
const { protect } = require('../MiddleWare/autheorised')
const { sendMessage, fetchAllMessage } = require('../Controllers/message')
const router = express.Router()

router.post('/', protect, sendMessage)
router.get("/:chatId", protect, fetchAllMessage)

module.exports = router