const { Router } = require("express")
const { addProduct, getSingleProduct, updateProduct, deleteProduct, getAllProducts } = require("../controller/product")
const upload = require('../helper/uploads')
const router = Router()

router.post('/', upload.array('images'), addProduct);
router.get('/', getAllProducts)
router.get("/:id", getSingleProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router