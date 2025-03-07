const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = async (userId)=>{
    return await jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn:'1h'})
}

const validate = async (token)=>{
    return await jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, validate }