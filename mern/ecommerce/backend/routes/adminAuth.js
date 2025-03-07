const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const router = express.Router()

router.get("/", async (req, res)=>{
    try{
        const adminExists = await User.findOne({email:"admin@gmail.com"})
        if(adminExists){
            return res.status(400).json({"message" : "user already exists"})
        }

        const hashedPassword = await bcrypt.hash("Admin1@", 10)
        const admin = new User({
            username : "narendra",
            email: "admin@gmail.com",
            password:hashedPassword,
            mobile:"999999999",
            role:"admin"
        })

        await admin.save()
        return res.status(200).json({
            message : `admin created succesfully, ${admin}`
        })

    } catch(error){
        return res.status(500).json({message : "Internal server error"})
    }
})

module.exports = router