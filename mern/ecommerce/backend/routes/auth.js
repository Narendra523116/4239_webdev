const express = require("express")
const login = require("../controller/login")
const signup = require("../controller/signup")

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)