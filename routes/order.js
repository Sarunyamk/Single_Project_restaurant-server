const express = require("express");
const router = express.Router();
const { getDashboardData, getOrders, updateOrderStatus, deleteOrder } = require("../controller/order-controller");


router.get("/dashboard", getDashboardData);


router.get('/', getOrders);
router.put('/update/:orderId', updateOrderStatus);
router.delete('/delete/:orderId', deleteOrder);


module.exports = router;