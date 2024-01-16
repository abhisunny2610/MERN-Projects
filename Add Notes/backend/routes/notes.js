const {Router} = require("express")
const { handleNotesSave } = require("../controllers/notes")

const router = Router()

router.post('/', handleNotesSave)

module.exports = router