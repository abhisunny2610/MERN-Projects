const {Router} = require("express")
const { registerStudent, updateStudent, deleteStudent, getSingleStudent, getAllStudent } = require("../controllers/student")
const isAdmin = require("../middleware/isAdmin")
const authenticateUser = require("../middleware/authenticate")
const router = Router()

router.post("/register", [authenticateUser, isAdmin] ,registerStudent)
router.get("/:id", authenticateUser, getSingleStudent)
router.get("/", authenticateUser, getAllStudent)
router.put("/update/:id", authenticateUser, updateStudent)
router.delete("/delete/:id", [authenticateUser, isAdmin] , deleteStudent)

module.exports = router