const {Router} = require("express")
const { handleNotesSave, handlegetSingleNote } = require("../controllers/notes")

const router = Router()

router.post('/', handleNotesSave)
router.get('/:id', handlegetSingleNote)

module.exports = router