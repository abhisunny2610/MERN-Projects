const {Router} = require("express")
const router = Router()

const productRoutes = require('../routes/product')

router.use("/product", productRoutes)

module.exports = router
