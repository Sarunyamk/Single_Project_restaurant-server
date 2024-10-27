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

exports.getAllMenuSaleUnit = (startDate, endDate) => {
    return prisma.menu_items.findMany({
        where: {
            order_detail: {
                some: {
                    order: {
                        createdAt: {
                            gte: new Date(startDate),
                            lte: new Date(endDate),   // ตรวจสอบว่าแปลงเป็น Date object ถูกต้อง
                        }
                    }
                }
            }
        },
        include: {
            order_detail: {
                include: {
                    order: true
                }
            }
        }
    });
};


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