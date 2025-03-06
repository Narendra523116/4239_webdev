const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = async (userId)=>{
    return jwt.sign(userId, process.env.JWT_SECRET, {expiresIn:'1h'})
}

const validate = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, validate }