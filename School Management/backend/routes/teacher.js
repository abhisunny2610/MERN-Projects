const { Router } = require("express")
const { registerTeacher, updateTeacher, deleteTeacher, getAllTeacher, getSingleTeacher } = require("../controllers/teacher")
const authenticateUser = require("../middleware/authenticate")
const isAdmin = require("../middleware/isAdmin")
const router = Router()

router.post("/register", registerTeacher)
router.get("/:id", authenticateUser, getSingleTeacher)
router.get("/", authenticateUser, getAllTeacher)
router.put("/update/:id", authenticateUser, updateTeacher)
router.delete("/delete/:id", [authenticateUser, isAdmin], deleteTeacher)

module.exports = router