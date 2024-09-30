const express = require("express");
const router = express.Router();
const {register,login,currentUser} = require("../controller/auth-controller");
const {registerAuthen,loginAuthen} = require("../middleware/validator");
// const {authenticate} = require("../middleware/authenticate");


router.post('/register',registerAuthen,register)
router.post('/login',loginAuthen,login)
// router.post('/current-user',authenticate,currentUser)




module.exports = router;