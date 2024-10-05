const express = require("express");
const router = express.Router();
const {showAllMenu,createMenu,updateMenu,deleteMenu} = require("../controller/editMenuAdmin-controller");
const {authenticate} = require("../middleware/authenticate");


router.get('/allmenu',showAllMenu)
router.post('/create-menu',authenticate,createMenu)
router.patch('/edit-menu/:menuId',authenticate,updateMenu)
router.delete('/delete-menu/:menuId',authenticate,deleteMenu)




module.exports = router;