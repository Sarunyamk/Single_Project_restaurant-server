const express = require("express");
const router = express.Router();
const { reportAllComments, reportAllMenuUnit } = require("../controller/admin-report-controller");



router.get('/all-comment', reportAllComments);
router.get('/menu-unit', reportAllMenuUnit);



module.exports = router;