const express = require("express");
const router = express.Router();

const { getConfig, confirmPayment, createPayment } = require("../controller/payment-controller")

router.get('/config', getConfig);
router.post('/create-payment-intent', createPayment);
router.post("/confirm-payment", confirmPayment);

module.exports = router;