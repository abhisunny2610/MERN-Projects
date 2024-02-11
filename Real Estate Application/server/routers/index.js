const {Router} = require("express")
const router = Router()

const authRoute = require('./auth')
const propertyRoute = require('./property')

router.use("/api/auth", authRoute)
router.use('/api/property', propertyRoute)

module.exports = router