const asyncHandler= require("express-async-handler");
const jwt = require("jsonwebtoken");
const CustomError = require('../errors/custom-error');

module.exports = function createAuth(allowedRoles=[]){
    const authentication=async function(req,res,next){
    try{
            let token;
            let authHeader=req.headers.Authorization||req.headers.authorization;
            if(authHeader&&authHeader.startsWith("Bearer")){
                token=authHeader.split(" ")[1];
                jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
                    if(err){
                        throw new CustomError("user not authenticated",401);
                    }
                    req.user = decoded.user;
                    tmp_user=decoded.user;
                    console.log(tmp_user);
                    const allowedRolesArr = [...allowedRoles];
                    if(allowedRolesArr.length ===0) return next(); //all roles allowed
                    if(allowedRolesArr.includes(tmp_user.roleId)) return next();
                    throw new CustomError("Acces interdit",403);
                });
                
            }
            else
            {
                throw new CustomError("user not authorized or token expired",401);
            }
        }
    catch(e){
            let message= "Une erreur s'est produite...";
            console.log(e.message);
            if(e instanceof CustomError) message = e.message;
            res.status(e.statusCode?e.statusCode:500 ).json({message: message});
    }
    }
    
    return [authentication]
}

