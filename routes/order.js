const express = require("express");
const router = express.Router();
const { getDashboardData, getOrders, updateOrderStatus, deleteOrder } = require("../controller/order-controller");
const { authenticate } = require("../middleware/authenticate");


router.get("/dashboard", getDashboardData);


router.get('/', getOrders);
router.put('/update/:orderId', authenticate, updateOrderStatus);
router.delete('/delete/:orderId', authenticate, deleteOrder);



module.exports = router;