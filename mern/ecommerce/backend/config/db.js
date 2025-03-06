const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
            .then(()=>{
                console.log("MongoDB connected succesfully")
            }).catch((err)=>{
                console.log(`error occured ${err}`);
            })
    }
    catch(err){
        console.log(`error occured while logging in ${err}`)
    }
}

module.exports = connectDB