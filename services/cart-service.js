const prisma = require("../config/prisma")

exports.findCartsByCustomerId = (customerId) => {
    return prisma.carts.findFirst({
        where: {
            customerId,
            status: "PENDING"
        }, include: {
            cart_Items: true
        }
    })
}


exports.createCart = (data) => {

    return prisma.carts.create({
        data: data
    });
}

exports.getCartByCustomerId = (userId) => {

    return prisma.carts.findFirst({
        where: {
            customerId: Number(userId),
            status: "PENDING"
        },
        include: {
            cart_Items: {
                include: {
                    item: true,
                },
            }
        },
    })
}