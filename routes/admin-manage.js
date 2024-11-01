const express = require("express");
const router = express.Router();
const { showAllMenu, getCategoryName, createMenu, updateMenu, deleteMenu } = require("../controller/admin-manage-controller");
const { authenticate } = require("../middleware/authenticate");
const uploadImage = require('../middleware/uploadImage')



router.get('/allmenu', showAllMenu)

router.get('/getCategoryName', getCategoryName)
router.post('/create-menu', uploadImage.single('image'), createMenu)
router.patch('/edit-menu/:menuId', updateMenu)
router.delete('/delete-menu/:menuId', deleteMenu)



module.exports = router;