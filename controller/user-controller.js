

const prisma = require("../config/prisma")
const createError = require("../utils/createError")

exports.getProfile = async (req,res,next)=>{
    try{

        const {userId} = req.params

        const user = await prisma.user.findMany({

            where : {
                id : Number(userId)
            },select : {
                id : true,
                firstname : true,
                lastname : true,
                phonenumber : true,
                address : true,
                email : true
            }
        })
        res.json(user)

    }catch(err){

        next(err)
    }
}

exports.editProfile = async (req,res,next)=>{
    try{

        const {userId} = req.params

        const {firstname,lastname,phonenumber,address,email,password} = req.body

        const user = await prisma.user.update({

            where : {
                id : Number(userId)
            },
            data : {
                firstname,
                lastname,
                phonenumber,
                address,
                email,
                password
            }
        })
        res.json("update success")

    }catch(err){

        next(err)
    }
}