const express = require("express");
const router = express.Router();
const { getUsers, EditUser, deleteUser } = require("../controller/admin-setting-controller");


router.get('/show-user', getUsers);
router.put('/edit-user/:userId', EditUser);
router.delete('/delete-user/:userId', deleteUser);



module.exports = router;