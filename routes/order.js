const express = require("express");
const router = express.Router();
const { confirmPayment, getDashboardData, getOrders, updateOrderStatus, deleteOrder } = require("../controller/order-controller");

router.post("/confirm-payment", confirmPayment);
router.get("/dashboard", getDashboardData);


router.get('/', getOrders);
router.put('/update/:orderId', updateOrderStatus);
router.delete('/delete/:orderId', deleteOrder);


module.exports = router;