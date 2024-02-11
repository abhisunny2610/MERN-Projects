const {Router} = require("express")
const { addProperty } = require("../controllers/property")
const router = Router()

router.post('/addproperty', addProperty)

module.exports = router