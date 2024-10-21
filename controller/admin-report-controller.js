const createError = require("../utils/createError")

const { getAllComment, getAllMenuSaleUnit, getAllSaleByDate } = require("../services/admin-report-service")

exports.reportAllComments = async (req, res, next) => {
    try {
        const comments = await getAllComment()

        if (!comments || comments.length === 0) {
            return createError(404, 'No comment found');
        }
        res.json(comments);
    } catch (err) {
        next(err)
    }
};

exports.reportAllMenuUnit = async (req, res) => {
    try {
        const menu = await getAllMenuSaleUnit()

        const report = menu.map((item) => {
            // รวมจำนวนชิ้นที่ขายได้ทั้งหมด
            const totalUnitsSold = item.order_detail.reduce((acc, detail) => acc + detail.count, 0);

            // รวมยอดขายทั้งหมดของเมนูนั้น
            const totalSales = item.order_detail.reduce((acc, detail) => acc + Number(detail.total), 0);


            return {
                menuId: item.id,
                menuName: item.menuName,
                price: item.price,
                totalUnitsSold: totalUnitsSold,
                totalSales: totalSales,
            };
        });

        const sortedReport = report.sort((a, b) => b.totalUnitsSold - a.totalUnitsSold);

        res.json(sortedReport);
    } catch (err) {
        next(err);
    }
};

exports.getSalesReportByDate = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body;
        console.log('Received startDate:', startDate, 'endDate:', endDate); // เช็คค่าที่ได้รับ

        if (!startDate || !endDate) {
            throw new Error('Start date and End date are required');
        }

        const orders = await getAllSaleByDate(startDate, endDate)

        const totalSales = orders.reduce((total, order) => total + Number(order.total), 0);

        res.json({
            orders,
            totalSales,
        });
    } catch (error) {
        console.error('Error generating sales report:', error); // เพิ่มการ log error
        next(error);
    }
};
