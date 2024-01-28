const express = require('express')
const { accessChat } = require('../Controllers/chat')
const { protect } = require('../MiddleWare/autheorised')
const router = express.Router()

router.post('/',protect, accessChat)
// router.get('/',fetchChats)
// router.post('/group', createGroupChat)
// router.put('/renamegroup', renameGroup)
// router.put('/removefromgroup', removeFromGroup)
// router.put('/addingroup', addInGroup)

module.exports = router