const express = require("express");
const router = express.Router();
const {editProfile,getProfile,authenToken} = require("../controller/user-controller");





router.get('/',authenToken,getProfile)
router.put('/edit-profile',authenToken,editProfile)





module.exports = router;