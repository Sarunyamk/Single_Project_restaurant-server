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


exports.reportAllMenuUnit = async (req, res, next) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
        }


        const menu = await getAllMenuSaleUnit(startDate, endDate);

        const report = menu.map((item) => {
            const totalUnitsSold = item.order_detail.reduce((acc, detail) => acc + detail.count, 0);
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

        if (!startDate || !endDate) {
            return createError(400, 'Start date and End date are required');
        }
        console.log("dfsdfsdfsdfsdfdsfsd")

        const orders = await getAllSaleByDate(startDate, endDate)
        console.log("dfsdfsdfsdfsdfdsfsd11111111111111")


        const totalSales = orders.reduce((total, order) => total + Number(order.total), 0);

        res.json({
            orders,
            totalSales,
        });
    } catch (error) {
        next(error);
    }
};
