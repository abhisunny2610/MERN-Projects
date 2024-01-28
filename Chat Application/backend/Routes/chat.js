const express = require('express')
const { accessChat, fetchChats, createGroupChat } = require('../Controllers/chat')
const { protect } = require('../MiddleWare/autheorised')
const router = express.Router()

router.post('/',protect, accessChat)
router.get('/',protect, fetchChats)
router.post('/group', createGroupChat)
// router.put('/renamegroup', renameGroup)
// router.put('/removefromgroup', removeFromGroup)
// router.put('/addingroup', addInGroup)

module.exports = router