const express = require('express');
const router = express.Router();
const cartController = require('../../controller/cartController');

// Define routes for cart operations
router.get('/:userId', cartController.getCartByUserId); // Get cart by user ID
router.post('/add', cartController.addItemToCart); // Add item to cart
router.delete('/remove', cartController.removeItemFromCart); // Remove item from cart
router.post('/increase', cartController.increaseItemQuantity); // Increase item quantity
router.post('/decrease', cartController.decreaseItemQuantity); // Decrease item quantity

module.exports = router;
