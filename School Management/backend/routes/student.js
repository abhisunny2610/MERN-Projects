const {Router} = require("express")
const { registerStudent, updateStudent } = require("../controllers/student")
const isAdmin = require("../middleware/isAdmin")
const authenticateUser = require("../middleware/authenticate")
const router = Router()

router.post("/register", registerStudent)
router.put("/update", [authenticateUser, isAdmin] , updateStudent)

module.exports = router