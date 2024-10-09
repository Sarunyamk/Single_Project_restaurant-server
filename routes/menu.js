const express = require("express");
const router = express.Router();
const { showAllMenu, mainMenu, saladMenu, sandwichSanckMenu, beverageMenu } = require("../controller/menu-controller");




router.get('/allmenu', showAllMenu)
router.get('/main-menu', mainMenu)
router.get('/salad-menu', saladMenu)
router.get('/snack-menu', sandwichSanckMenu)
router.get('/beverage-menu', beverageMenu)





module.exports = router;