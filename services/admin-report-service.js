const prisma = require("../config/prisma")

exports.getAllComment = () => {
    return prisma.comments.findMany({
        include: {
            user: true,
            order: {
                include: {
                    order_detail: {
                        include: {
                            item: true,
                        },
                    },
                },
            },
        }
    });
}

exports.getAllMenuSaleUnit = () => {

    return prisma.menu_items.findMany({
        select: {
            id: true,
            menuName: true,
            price: true,
            order_detail: {
                select: {
                    count: true,
                    total: true,
                },
            },
        },
    });
}

exports.getAllSaleByDate = (startDate, endDate) => {
    return prisma.orders.findMany({
        where: {
            status: 'SUCCESS',
            createdAt: {
                gte: new Date(startDate), // Start date
                lte: new Date(endDate),   // End date
            },
        },
        select: {
            id: true, // ดึง Order ID ด้วย
            total: true, // ดึงยอดขายรวม
            createdAt: true, // ดึงวันที่ของออเดอร์
            user: {
                select: {
                    firstname: true,
                    phonenumber: true,
                },

            },
            order_detail: {
                select: {
                    item: {
                        select: {
                            menuName: true,
                        },
                    },
                },
            },
        },
    });
};