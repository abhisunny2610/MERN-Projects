const {Router} = require("express")
const { addProperty, getRecentProperties, getRentProperties, getSellProperties, getAllProperties, getSingleProperties } = require("../controllers/property")
const authenticateUserMiddleware = require("../middlewares/authenticateUser")
const getAgentIdMiddleware = require("../middlewares/getAgentId")
const router = Router()

router.post('/addproperty',[authenticateUserMiddleware, getAgentIdMiddleware] ,addProperty)
router.get('/properties', getAllProperties);
router.get('/properties/:id', getSingleProperties);
router.get('/recent-properties', getRecentProperties);
router.get('/sell-properties', getSellProperties);
router.get('/rent-properties', getRentProperties);

module.exports = router