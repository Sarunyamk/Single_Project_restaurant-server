const express = require("express");
const router = express.Router();

const { getConfig, createPayment } = require("../controller/payment-controller")

router.get('/config', getConfig);
router.post('/create-payment-intent', createPayment);

module.exports = router;