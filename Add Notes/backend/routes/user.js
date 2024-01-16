const {Router} = require("express")
const { handleSingup, handleSignin } = require("../controllers/user")

const router = Router()

router.post('/', handleSingup)
router.post('/signin', handleSignin)

module.exports = router