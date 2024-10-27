const express = require("express");
const router = express.Router();
const { getUsers, EditUser, deleteUser } = require("../controller/admin-setting-controller");
const { authenticate } = require("../middleware/authenticate");


router.get('/show-user', getUsers);
router.put('/edit-user/:userId', authenticate, EditUser);
router.delete('/delete-user/:userId', authenticate, deleteUser);



module.exports = router;