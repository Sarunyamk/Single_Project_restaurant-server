

const prisma = require("../config/prisma")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const createError = require("../utils/createError")
const userService = require("../services/user-service")


exports.register = async(req,res,next)=>{

    try{

        const {firstname,lastname,
            phonenumber,address,
            email,password} = req.body
        

        const user = await userService.getUserByEmail(email)

        if(user){

            return createError(400,"Email already exist!!")
        }
       
        const hashPassword = await bcryptjs.hash(password,10);
        
        const newUser = await prisma.user.create({

            data : {
                firstname,lastname,
                phonenumber,address,
                email,
                password : hashPassword
            }
        })
       

        res.json({newUser})

    }catch(err){

        next(err)
    }
}

exports.login = async(req,res,next)=>{

    try{

        const {email,password} = req.input

       
         const user = await userService.getUserByEmail(email)
         if(!user){

            return createError(400,"User not found!!")
         }

         const checkPassword = await bcryptjs.compare(password,user.password)

         if(!checkPassword){

            return createError(400,"Wrong password!!")
         }
         //create payload
         const payLoad = {
            user : {
                id : user.id,
                firstname : user.firstname,
                email : user.email,
                role : user.role
            }
         }

         //create token
         const genToken = jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn : "1d"})
         
         console.log(genToken)
         //send to frontend

         res.json({
            user: payLoad,
            token : genToken
         })



    }catch(err){

        next(err)
    }
}

exports.currentUser = async(req,res,next)=>{

    try{

        const email = req.user.user.email
        const member = await userService.getCurrentUserByEmail(email)

        console.log(member)
        res.json({member})
    }catch(err){

        next(err)
    }
}