const {Router}= require("express")
const router = Router()
const userRouter = require('./user')
const studentRouter = require('./student')

router.use("/user", userRouter)
router.use('/student', studentRouter)

module.exports = router