const {Router} = require("express")
const { addProperty } = require("../controllers/property")
const authenticateUserMiddleware = require("../middlewares/authenticateUser")
const getAgentIdMiddleware = require("../middlewares/getAgentId")
const router = Router()

router.post('/addproperty',[authenticateUserMiddleware, getAgentIdMiddleware] ,addProperty)

module.exports = router