const express = require("express");
const router = express.Router();
const { createCart, getCart, deleteCartItem, updateCartItem } = require("../controller/cart-controller");




router.post('/', createCart)
router.get('/get-cart/:userId', getCart)
router.delete('/delete-cart_item/:cartItemId', deleteCartItem)
router.patch('/update-cart_item/:cartItemId', updateCartItem)





module.exports = router;