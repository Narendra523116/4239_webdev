const express = require('express');
require('dotenv').config()
const cors = require("cors")
const authRoutes = require("./routes/auth")
const authMiddleware = require("./middleware/authMiddleware")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
var port = process.env.PORT

const server = http.createServer(app)

const io = new Server(server, {
    cors : {origin : 'http:localhost:4000', 
        methods : ['GET', 'POST']
    }
})



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.get("/", (req, res)=>{
    res.status(200).send("hello world")
})

app.use("/api/auth", authRoutes)
app.use("/api/protected", authMiddleware, (req, res)=>{
    console.log(req.user)
    res.json({
        "message" : `hello user ${req.user.username}, u are authenticated succesfully`
    })
})


// app.listen(port, ()=>{
//     console.log(`server is running in the port ${port} succesfully`)
// })

io.on("connection", (socket)=>{
    console.log("new client connction created")
    socket.on("message", (data)=>{
        io.emit("message", data)
    })
    socket.on("disconnect", ()=>{
        console.log("socket disconnected")
    })
})

server.listen(port, ()=>{
    console.log(`server is running in the port ${port} succesfully`);
})