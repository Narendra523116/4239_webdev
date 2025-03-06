const mongoose =require("mongoose")
const doctorSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    designation:{
        type:String,
    },
    mobile:{
        type:String,
    },
    specialization:{
        type:String
    }
    
})
const Doctor=mongoose.model("Doctor",doctorSchema)

module.exports=Doctor