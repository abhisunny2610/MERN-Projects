const {Router}= require("express")
const router = Router()
const userRouter = require('./user')
const studentRouter = require('./student')
const teacherRouter = require("./teacher")
const noticeRouter = require("./notice")

router.use("/user", userRouter)
router.use('/student', studentRouter)
router.use('/teacher', teacherRouter)
router.use('/notice', noticeRouter)

module.exports = router