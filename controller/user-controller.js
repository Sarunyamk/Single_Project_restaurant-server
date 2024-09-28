

const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const jwt = require("jsonwebtoken")

exports.authenToken = (req,res,next)=>{

    const {authorization} = req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return next(createError(401, "Unauthorized"))
    }

    const token = authorization.split(" ")[1] 
    
    if(!token){
        return next(createError(401,"Unauthorized"))
    }
   
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{

        if(err){
            return createError(401,"Unauthorized")
        }
        req.user = user
        next()
    })
}

exports.getProfile = async (req,res,next)=>{
    try{

        const userId = req.user.id;

        if (!userId) {
            return createError(400, "Invalid token or userId")
        }

        const user = await prisma.user.findUnique({
            where : {
                id : Number(userId)
            },

            select : {
                id : true,
                firstname : true,
                lastname : true,
                phonenumber : true,
                address : true,
                email : true
            }
        })

        if(!user){

            return createError(404,"User not found")
        }
        res.json(user)

    }catch(err){

        next(err)
    }
}

exports.editProfile = async (req,res,next)=>{
    try{

        const userId = req.user.id

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