
const express = require('express');
const router = express.Router();
const productController = require('../../controller/productControllers');

router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);

router.delete('/:id', productController.deleteProduct);


module.exports = router