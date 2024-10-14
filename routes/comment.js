const express = require("express");
const router = express.Router();
const { getOrders, addCommentsToOrders, getAllComments } = require("../controller/comment-controller");
const { authenticate } = require("../middleware/authenticate");



router.get('/user/:customerId', getOrders);
router.post('/', authenticate, addCommentsToOrders);
router.get('/show-comment', getAllComments);




module.exports = router;