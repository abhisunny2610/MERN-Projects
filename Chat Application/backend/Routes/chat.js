const express = require('express')
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addInGroup } = require('../Controllers/chat')
const { protect } = require('../MiddleWare/autheorised')
const router = express.Router()

router.post('/',protect, accessChat)
router.get('/',protect, fetchChats)
router.post('/creategroup',protect, createGroupChat)
router.put('/renamegroup',protect, renameGroup)
router.put('/removefromgroup',protect, removeFromGroup)
router.put('/addingroup',protect, addInGroup)

module.exports = router