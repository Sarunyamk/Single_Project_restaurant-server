
const  createError = require("../utils/createError")
const jwt = require("jsonwebtoken")

exports.authenticate = (req,res,next)=>{

    try{
        //1. check header ว่ามี token หรือไม่
        const authHeader = req.headers.authorization
        
        if(!authHeader){
            
            return createError(401,"Token missing")
        }
        
        const token = authHeader.split(" ")[1]
       
        console.log(authHeader)

        //2. decode verify token        
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            
            if(err){
                
                return createError(401,"Token invalid")
            }
            
            req.user = decode
            next()
        })
    }catch(err){

        next(err)
    }
}