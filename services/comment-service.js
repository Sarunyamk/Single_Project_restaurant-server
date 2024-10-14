const prisma = require("../config/prisma")

exports.getOrdersByUserId = (customerId) => {

    return prisma.orders.findMany({
        where: {
            customerId: Number(customerId),
            status: 'SUCCESS',
            comment: {
                some: {
                    status: { not: 'SUCCESS' }
                }
            }
        },
        include: {
            order_detail: true,
            comment: true
        }
    });
}

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
        }
    });

}