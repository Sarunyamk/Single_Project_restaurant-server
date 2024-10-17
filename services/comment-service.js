const prisma = require("../config/prisma")

exports.getOrdersByUserId = async (customerId) => {
    return prisma.orders.findMany({
        where: {
            customerId: Number(customerId),
            status: 'SUCCESS',  // เงื่อนไขให้ดึงเฉพาะออเดอร์ที่สำเร็จแล้ว
            comment: {
                some: {
                    status: 'PENDING'  // ดึงเฉพาะคอมเมนต์ที่ยังเป็น PENDING
                }
            }
        },
        include: {
            order_detail: {
                include: {
                    item: true,  // ตรวจสอบว่ารวมข้อมูล item ของ order_detail แล้วหรือไม่
                }
            },
            comment: true  // ตรวจสอบว่ารวมข้อมูลคอมเมนต์แล้วหรือไม่
        }
    });
};

exports.getAllCommentByrating = () => {

    return prisma.comments.findMany({
        where: {
            rating: 'GOOD'
        },
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
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 10
    });

}



exports.getMenuItemComments = async (menuItemId) => {
    return prisma.comments.findMany({
        where: {
            status: "SUCCESS",
            order: {
                order_detail: {
                    some: {
                        itemId: menuItemId,  // ตรวจสอบว่ามีรายการนี้ในรายละเอียดออเดอร์
                    },
                },
            },
        },
        include: {
            user: {
                select: {
                    firstname: true,
                    lastname: true,  // ดึงข้อมูลชื่อผู้ใช้ที่คอมเมนต์
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        }

    });
};