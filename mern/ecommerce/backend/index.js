const express = require("express")
const connectDB = require("./config/db")
connectDB()

const PORT = process.env.PORT
const app = express()

app.listen(PORT, ()=>{
    console.log(`server is running in the port ${PORT}`)
})