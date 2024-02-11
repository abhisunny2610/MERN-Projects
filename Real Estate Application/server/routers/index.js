const {Router} = require("express")
const router = Router()

const authRoute = require('./auth')

router.use("/api/auth", authRoute)

module.exports = router