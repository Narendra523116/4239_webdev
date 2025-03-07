const express = require("express")
const Product = require("../models/Product")
const { authMiddleWare, verifyAdmin } = require("../middleware/authMiddleWare")

const router = express.Router()
router.post("/add", authMiddleWare, verifyAdmin, async (req, res)=>{
    try{
        console.log("iam apprearede here")
        const {name, description, price, category, stock, imageURL} = req.body 
        // console.log(req.body)

        if(!name || !description || !price || !category || !stock || !imageURL){
            return res.status(400).json({
                message : "All the fields are needed at the time of adding products"
            })
        }

        const newProduct = new Product({
            name, description, price, category, stock, imageURL, createdBy : req.user.id
        })

        await newProduct.save()
        return res.status(201).json({"message":"Product added successfully"})

    }catch(error){
        console.log(error)
        res.status(500).json({error : "Internal server error"})
    }
})

router.get("/", async(req, res)=>{
    try{
        const products = await Product.find()
        res.json(products)
    }catch(err){
        return res.status(500).json({
            message : "internal server error"
        })
    }
})

router.delete("/:id", async(req, res)=>{
    try{
        const product = await Product.findById(res.params.id)
        if(!product){
            res.status(404).json({
                message : "product not found"
            })
        }
        await product.deleteOne()
        return res.status(200).json({
            "message" : "Product deleted suceesfully"
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message : "internal server error"
        })
    }
})

module.exports = router