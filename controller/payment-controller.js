const createError = require("../utils/createError")
const prisma = require("../config/prisma")

const { createOrderFromCart } = require("../services/order_service");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});

exports.confirmPayment = async (req, res, next) => {
    try {
        const { customerId } = req.body;

        if (!customerId) {
            return createError(400, 'Customer ID is required');
        }

        const customerExists = await prisma.user.findFirst({
            where: {
                id: customerId
            }
        });

        if (!customerExists) {
            return createError(400, 'Customer not found');
        }

        const order = await createOrderFromCart(customerId); // สร้าง Order จาก Cart

        res.json({
            message: 'Order created and payment confirmed',
            order,
        });
    } catch (err) {
        console.error('Error during payment confirmation:', err.message); // แสดงข้อผิดพลาด
        next(err);
    }
};


exports.getConfig = (req, res, next) => {

    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
}


exports.createPayment = async (req, res, next) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return createError(400, "Invalid amount");
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "thb",
            amount: amount,
            automatic_payment_methods: { enabled: true },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {

        next(err);
    }
};