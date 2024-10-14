const prisma = require("../config/prisma")
const createError = require("../utils/createError")

const { createOrderFromCart, getTodaySales } = require("../services/order_service");

const { getAllOrders, updateOrderStatusById, deleteOrderById } = require("../services/order_service");


exports.confirmPayment = async (req, res, next) => {
    try {
        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({ message: 'Customer ID is required' });
        }

        const customerExists = await prisma.user.findFirst({
            where: {
                id: customerId
            }
        });

        if (!customerExists) {
            return res.status(400).json({ message: 'Customer not found' });
        }

        const order = await createOrderFromCart(customerId); // สร้าง Order จาก Cart

        res.json({
            message: 'Order created and payment confirmed',
            order,
        });
    } catch (err) {
        console.error('Error during payment confirmation:', err.message); // แสดงข้อผิดพลาด
        next(err); // ส่งต่อข้อผิดพลาดไปยัง middleware ที่จัดการ
    }
};


exports.getDashboardData = async (req, res, next) => {
    try {
        const salesData = await getTodaySales();

        res.json({
            message: 'Dashboard data fetched successfully',
            salesData,
        });
    } catch (err) {
        next(err)
    }
};

//admin table order
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (err) {
        next(err)
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const updatedOrder = await updateOrderStatusById(Number(orderId), status);
        res.json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        await deleteOrderById(Number(orderId));
        res.json({ message: "Order deleted" });
    } catch (err) {
        next(err);
    }
};