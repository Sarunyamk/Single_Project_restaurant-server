const express = require("express");
const router = express.Router();
const {showAllMenu,createMenu} = require("../controller/menu-controller");





router.post('/create-menu',createMenu)


router.get('/allmenu',showAllMenu)
router.put('/category-menu')





module.exports = router;