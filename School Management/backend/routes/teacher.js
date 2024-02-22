const {Router} = require("express")
const { registerTeacher } = require("../controllers/teacher")
const router = Router()

router.post("/register", registerTeacher)

module.exports = router