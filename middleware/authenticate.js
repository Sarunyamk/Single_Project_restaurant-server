const jwt = require('jsonwebtoken');
const createError = require("../utils/createError");


exports.authenticate = async(req,res,next)=>{

    try{

        const authorization = req.headers.authorization;

        //check ว่ามี authorization อยู่หรือไม่ และเริ่มด้วย bearer หรือไม่
        if(!authorization || !authorization.startsWith("Bearer ")){

            return createError(401,"Unauthorized")
        }

        // แยก token ออกมา
        const token = authorization.split(" ")[1]

        if(!token){

            return createError(401,"Unauthorized")
        }
        

        // verify token 
        const jwtPayload = jwt.verify(token,process.env.JWT_SECRET);        

        //check ว่า User มีในระบบไหม
        const user = await userService.getUserById(jwtPayload.id);

        if(!user){

            return createError(401,"Unauthorized")
        }

        //ติด user ไว้ใน request
        req.user = user;
        next();

    }catch(err){
        next(err)
    }
}

