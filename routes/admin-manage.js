const express = require("express");
const router = express.Router();
const { showAllMenu, getCategoryName, createMenu, updateMenu, deleteMenu } = require("../controller/admin-manage-controller");
const { authenticate } = require("../middleware/authenticate");
const uploadImage = require('../middleware/uploadImage')



router.get('/allmenu', showAllMenu)
router.post('/create-menu', uploadImage.single('image'), createMenu)
router.get('/getCategoryName', getCategoryName)
router.patch('/edit-menu/:menuId', authenticate, updateMenu)
router.delete('/delete-menu/:menuId', authenticate, deleteMenu)





module.exports = router;