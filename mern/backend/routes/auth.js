const express = require('express');
const {generateToken} = require('../config/jwt')
const {addUser, findUser} = require('../models/users')
const bcrypt = require('bcryptjs')

const router = express.Router()

router.post("/register", async(req, res)=>{
    const {username, password} = req.body;
    // console.log(req)
    console.log(`username ${username} password ${password}`)
    if(findUser(username)){
        return res.status(400).json({
            "message" : "user already existed"
        })
    }
    const newUser = await addUser(username, password);
    const token = await generateToken(newUser);

    console.log(newUser)

    return res.status(201).json({
        "message" : "User added succesfully",
        "newuser" : newUser,
        "generateToken" : token
    })

});

router.post("/login", async(req, res)=>{
    const {username, password} = req.body
    const user = findUser(username)
    if(!user){
        return res.status(404).json({
            "message" : "user not exist, please register before logging in"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({
            "message" : "Incorrect password"
        })
    }
    const token = generateToken(user)
    console.log(user)
    console.log(token)
    return res.status(200).json({
        "message" : "logged in succesfully",
        "token" : `${token}`
    })

})

module.exports = router