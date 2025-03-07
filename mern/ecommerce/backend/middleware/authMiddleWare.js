const {validate} = require("../config/jwt")
const User = require("../models/User")

const authMiddleWare = async (req, res, next)=>{
    const token = req.headers.Authorization || req.headers.authorization
    if(!token){
        return res.status(401).json({error : "token required for accessing"})
    }
    try{
        const verify = await validate(token.replace("Bearer", ""))
        req.user = verify
        console.log("iam the culprit")
        next()
        return;
    }catch(error){
        res.status(400).json({error:"unexpected error occured"})
    }
}

const verifyAdmin = async (req, res, next)=>{
    try{
        const user = await User.findById(req.user.id)
        if(!user || user.role != "admin"){
            return res.status("401").json({"message" : "Access denied"})
        }
        next();
    }catch(error){
        res.status(500).json({error : "internal server error"})
    }
}

module.exports = {authMiddleWare, verifyAdmin}