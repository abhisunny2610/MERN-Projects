const {Router}= require("express")
const { addNotice, getAllNotice, getNoticeById, deleteNotice, updateNotice } = require("../controllers/notice")
const authenticateUser = require("../middleware/authenticate")
const isAdmin = require("../middleware/isAdmin")
const router = Router()

router.post('/', authenticateUser ,addNotice)
router.get('/', getAllNotice)
router.get('/:id', getNoticeById)
router.delete('/:id', [authenticateUser, isAdmin] ,deleteNotice)
router.put("/:id", [authenticateUser, isAdmin], updateNotice)

module.exports = router