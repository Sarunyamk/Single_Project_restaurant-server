const express = require("express");
const router = express.Router();
const { editProfile, getProfile } = require("../controller/user-controller");
const { authenticate } = require("../middleware/authenticate");

router.get('/', authenticate, getProfile)
router.patch('/edit-profile/:userId', authenticate, editProfile)



module.exports = router;