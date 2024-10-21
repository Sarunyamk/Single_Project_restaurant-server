const prisma = require("../config/prisma")
const createError = require("../utils/createError")


const { getTodaySales } = require("../services/order_service");

const { getAllOrders, updateOrderStatusById, deleteOrderById } = require("../services/order_service");



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