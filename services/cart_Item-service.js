const prisma = require("../config/prisma")

exports.findCartItemByItemId = (itemId) => {

    return prisma.cart_Items.findFirst({
        where: {
            itemId: itemId
        },
    })
}

exports.updateCartItem = (findCartItems, items) => {

    return prisma.cart_Items.update({

        where: {
            id: findCartItems.id
        },
        data: {
            count: findCartItems.count + items.count,
            total: (findCartItems.count + items.count) * items.price
        }
    })
}

exports.createCartItem = (items, idd) => {

    return prisma.cart_Items.create({
        data: {
            cartId: idd,
            itemId: items.itemId,
            price: items.price,
            count: items.count,
            total: items.price * items.count,
        }
    })
}