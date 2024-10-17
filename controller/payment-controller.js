const prisma = require("../config/prisma")
const createError = require("../utils/createError")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-08-01",
});


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
        // res.status(400).send({
        //     error: {
        //         message: isError.message,
        //     },
        // });
        next(err);
    }
};