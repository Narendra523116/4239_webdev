const express=require("express")
const cors =require("cors")
const connectDB =require("./config/db")
const authRoutes =require("./routes/auth")
const adminRoutes = require("./routes/adminAuth")
const ProductRoutes = require("./routes/productRoutes")
require("dotenv").config()

const PORT = process.env.PORT 


const app=express()


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/product", ProductRoutes)

connectDB()


app.get("/0", (req, res)=>{
    res.status(200).send("hello world")
})

app.listen(PORT,()=>{
    console.log(`server is runnning in the port ${PORT} successfully`)
})