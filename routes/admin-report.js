const express = require("express");
const router = express.Router();
const { reportAllComments, reportAllMenuUnit, getSalesReportByDate } = require("../controller/admin-report-controller");



router.get('/all-comment', reportAllComments);
router.post('/menu-unit', reportAllMenuUnit);
router.post('/sales-report', getSalesReportByDate);


module.exports = router;