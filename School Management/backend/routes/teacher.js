const {Router} = require("express")
const { registerTeacher, updateTeacher, deleteTeacher } = require("../controllers/teacher")
const authenticateUser = require("../middleware/authenticate")
const isAdmin = require("../middleware/isAdmin")
const router = Router()

router.post("/register", registerTeacher)
router.put("/update/:id", [authenticateUser, isAdmin] ,updateTeacher)
router.delete("/delete/:id", [authenticateUser, isAdmin] ,deleteTeacher)

module.exports = router