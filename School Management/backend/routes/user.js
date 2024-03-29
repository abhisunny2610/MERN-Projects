const {Router}= require("express")
const { register, login } = require("../controllers/user")
const router = Router()

router.post("/", register)
router.post("/login", login)

module.exports = router