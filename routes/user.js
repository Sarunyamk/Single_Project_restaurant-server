const express = require("express");
const router = express.Router();
const { editProfile, getProfile } = require("../controller/user-controller");
const { authenticate } = require("../middleware/authenticate");
const { getHistory } = require("../controller/comment-controller");



router.get('/', authenticate, getProfile)
router.patch('/edit-profile/:userId', authenticate, editProfile)

router.get('/history-order/:userId', authenticate, getHistory);


module.exports = router;