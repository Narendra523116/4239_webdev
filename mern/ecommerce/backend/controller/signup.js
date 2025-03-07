const {generateToken} = require('../config/jwt')
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const signup = async(req, res)=>{
    try{
        const {username, email, password, mobile, role} = req.body
        let existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({"message" : "user already existed"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            email, 
            password : hashedPassword,
            mobile,
            role
        })
        console.log("signup route", newUser)
        const token = await generateToken(newUser._id)
        console.log(token)
        res.status(201).json({"message":"User created",token,role:newUser.role})
    }catch(err){
        console.log(err)
        res.status(500).json({"message" : "server internal error"})
    }
}

module.exports = signup