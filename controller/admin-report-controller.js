const prisma = require("../config/prisma")
const createError = require("../utils/createError")

const { getAllComment, getAllMenuSaleUnit } = require("../services/admin-report-service")

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