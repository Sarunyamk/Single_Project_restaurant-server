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