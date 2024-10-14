const express = require("express");
const router = express.Router();
const { confirmPayment, getDashboardData, getOrders, updateOrderStatus, deleteOrder } = require("../controller/order-controller");

router.post("/confirm-payment", confirmPayment);
router.get("/dashboard", getDashboardData);


router.get('/', getOrders); // ดึงข้อมูล orders ทั้งหมด
router.put('/update/:orderId', updateOrderStatus); // อัปเดตสถานะของ order
router.delete('/delete/:orderId', deleteOrder); // ลบ order


module.exports = router;