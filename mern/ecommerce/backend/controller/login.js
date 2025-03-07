const {generateToken} = require("../config/jwt")
const User = require("../models/User")
const bcrypt = require("bcryptjs")

const login = async(req, res)=>{
    try{
        const {email,password}=req.body
        console.log(req.body)
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({"message":"User not found"})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({"message":"Passdword incorrect"})
        }
        const token=await generateToken(user._id)
        res.status(200).json({"message":"login successful",token,role:user.role})
    }
    catch(err){
        console.log("Error from login",err)
        res.status(500).json({"message":"Internal server error from login route"})
    }
}

module.exports = login