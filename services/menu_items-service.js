const prisma = require("../config/prisma")

exports.showAllMenuItem = () => {

    return prisma.menu_items.findMany({

        select: {
            id: true,
            menuName: true,
            price: true,
            image: true,
            description: true,
            category: {
                select: {
                    id: true,
                    categoryName: true
                }
            }
        }
    })
}

exports.updateMenuItem = (menuId, menuName, price, description) => {

    return prisma.menu_items.update({

        where: {
            id: Number(menuId)
        },
        data: {
            menuName, price, description
        }
    })
}

exports.deleteMenuItem = (menuId) => {

    return prisma.menu_items.delete({

        where: {
            id: Number(menuId)
        }
    })
}

exports.getCategoryMain = () => {

    return prisma.menu_items.findMany({

        where: {
            categoryId: 1,
        },
        select: {
            id: true,
            menuName: true,
            price: true,
            description: true,
            image: true,
            category: {
                select: {
                    id: true,
                    categoryName: true
                }
            }
        }
    })
}

exports.getCategorySalad = () => {

    return prisma.menu_items.findMany({

        where: {
            categoryId: 2,
        },
        select: {
            id: true,
            menuName: true,
            price: true,
            description: true,
            image: true,
            category: {
                select: {
                    id: true,
                    categoryName: true
                }
            }
        }
    })
}
exports.getCategorySandwichSnack = () => {

    return prisma.menu_items.findMany({

        where: {
            categoryId: {
                in: [3, 4]
            }
        },
        select: {
            id: true,
            menuName: true,
            price: true,
            description: true,
            image: true,
            category: {
                select: {
                    id: true,
                    categoryName: true
                }
            }
        }
    })
}
exports.getCategoryBeverage = () => {

    return prisma.menu_items.findMany({

        where: {
            categoryId: 5,
        },
        select: {
            id: true,
            menuName: true,
            price: true,
            description: true,
            image: true,
            category: {
                select: {
                    id: true,
                    categoryName: true
                }
            }
        }
    })
}
