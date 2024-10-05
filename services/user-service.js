const prisma = require("../config/prisma")

exports.getUserByEmail = (email)=>{

    return prisma.user.findFirst({

        where:{
            email :email
        }
    })
}


exports.getCurrentUserByEmail = (email)=>{

    return prisma.user.findFirst({

        where : {
            email,
        },
        select : {
            id : true,
            email : true,
            role : true
        }
    })
}