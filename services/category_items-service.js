const prisma = require("../config/prisma")

exports.getCategoryNameBycategoryId = () => {

    return prisma.category_items.findMany({

        select: {
            id: true,
            categoryName: true
        }
    })
}