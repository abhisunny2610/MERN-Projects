const {Router}= require("express")
const router = Router()
const userRouter = require('./user')
const studentRouter = require('./student')
const teacherRouter = require("./teacher")

router.use("/user", userRouter)
router.use('/student', studentRouter)
router.use('/teacher', teacherRouter)

module.exports = router