const express = require("express");
const router = express.Router();
const {editProfile,getProfile} = require("../controller/user-controller");





router.get('/:userId',getProfile)
router.put('/edit-profile/:userId',editProfile)





module.exports = router;