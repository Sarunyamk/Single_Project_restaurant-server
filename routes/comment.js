const express = require("express");
const router = express.Router();
const { getOrders, updateCommentStatus, getAllComments, ShowCommentReview } = require("../controller/comment-controller");
const { authenticate } = require("../middleware/authenticate");



router.get('/user/:customerId', getOrders);
router.put('/update-comment', authenticate, updateCommentStatus);


// show comment ที่ลูกค้าคอมเมนท์ เฉพาะ rating good
router.get('/show-comment', getAllComments);
router.get('/review-comment/:itemId', ShowCommentReview);




module.exports = router;