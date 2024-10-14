const prisma = require("../config/prisma")

exports.getUserByEmail = (email) => {

    return prisma.user.findFirst({

        where: {
            email: email
        }
    })
}

exports.getUserProfile = (userId) => {

    return prisma.user.findUnique({

        where: {
            id: userId,
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            phonenumber: true,
            address: true,
            email: true,
        },
    })
}

exports.checkUserByUserId = (userId) => {

    return prisma.user.findUnique({

        where: { id: userId },
    })
}

exports.createNewUser = (hashPassword, firstname, lastname,
    phonenumber, address, email) => {

    return prisma.user.create({

        data: {
            firstname, lastname,
            phonenumber, address,
            email,
            password: hashPassword
        }
    })

}

exports.getCurrentUserByEmail = (email) => {

    return prisma.user.findFirst({

        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            role: true
        }
    })
}

