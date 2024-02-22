const {Router} = require("express")
const { registerStudent, updateStudent, deleteStudent } = require("../controllers/student")
const isAdmin = require("../middleware/isAdmin")
const authenticateUser = require("../middleware/authenticate")
const router = Router()

router.post("/register", registerStudent)
router.put("/update/:id", [authenticateUser, isAdmin] , updateStudent)
router.delete("/delete/:id", [authenticateUser, isAdmin] , deleteStudent)

module.exports = router