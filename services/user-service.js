const prisma = require('../config/prisma');

exports.getUserByEmail = (email)=>{

    return prisma.user.findFirst({
        where : {
            email
        }
    })
}

exports.getUserById = (userId)=>{

    return prisma.user.findFirst({
        where : {
            id : userId
        }
    })
}