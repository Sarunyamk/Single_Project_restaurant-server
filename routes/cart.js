const express = require("express");
const router = express.Router();
const { createCart, getCart, deleteCartItem, updateCartItem } = require("../controller/cart-controller");


router.post('/', createCart)
router.get('/get-cart/:userId', getCart)
router.patch('/update-cart_item/:cartItemId', updateCartItem)
router.delete('/delete-cart_item/:cartItemId', deleteCartItem)



module.exports = router;