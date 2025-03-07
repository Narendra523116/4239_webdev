const mongoose = require("mongoose")
const ProductSchema = mongoose.Schema({
    name:{type:String,required: true },
    description:{type:String,required:true},
    price:{type:String,required:true},
    category:{type:String,required:true},
    stock:{type:String,required:true},
    imageURL:{type:String,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref: "User",required :true}
})

module.exports = mongoose.model("Product", ProductSchema)