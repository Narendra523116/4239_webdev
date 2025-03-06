const {validateToken} = require('../config/jwt')
const authMiddleware = (req, res, next) =>{
    const token = req.header("authorization")
    if(!token){
        return res.status(401).json({
            "message" : "Access denined login first"
        })
    }

    try{
        const verified = validateToken(token.replace("Bearer ", ""))
        req.user = verified;
        next();
        //this next allows the programs for furhter routing other it will stop callling other routes
    }catch(e){
        console.log(error)
        res.status(403).json({
            "Message" : `unauthorized access ${e}`
        })
    }
}

module.exports = authMiddleware