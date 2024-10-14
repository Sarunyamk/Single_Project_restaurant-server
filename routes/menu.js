const express = require("express");
const router = express.Router();
const { showAllMenu, mainMenu, saladMenu, sandwichSnackMenu, beverageMenu, getPopularMenus } = require("../controller/menu-controller");




router.get('/allmenu', showAllMenu)
router.get('/main-menu', mainMenu)
router.get('/salad-menu', saladMenu)
router.get('/snack-menu', sandwichSnackMenu)
router.get('/beverage-menu', beverageMenu)

router.get('/popular', getPopularMenus);




module.exports = router;