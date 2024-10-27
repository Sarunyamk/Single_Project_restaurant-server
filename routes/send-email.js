const express = require("express");
const router = express.Router();
const { sendEmailController } = require('../controller/send-email-controller')
const { authenticate } = require("../middleware/authenticate");




router.post('/', authenticate, sendEmailController)





module.exports = router;