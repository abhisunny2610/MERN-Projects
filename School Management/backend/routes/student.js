const {Router} = require("express")
const { registerStudent } = require("../controllers/student")
const router = Router()

router.post("/register", registerStudent)

module.exports = router