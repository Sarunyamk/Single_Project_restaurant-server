const express = require("express");
const router = express.Router();
const { createCart, getCart, deleteCartItem, updateCartItem, getCartItemCount } = require("../controller/cart-controller");
const { authenticate } = require("../middleware/authenticate");



router.post('/', authenticate, createCart)
router.get('/get-cart/:userId', getCart)
router.patch('/update-cart_item/:cartItemId', updateCartItem)
router.delete('/delete-cart_item/:cartItemId', deleteCartItem)
router.get('/count/:userId', getCartItemCount)



module.exports = router;