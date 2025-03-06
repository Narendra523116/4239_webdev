const express =require("express")
const router=express.Router()
const bcrypt = require("bcryptjs")
const Patient =require("../models/Patient")


router.post("/addpatient",async (req,res)=>{
    const {name,mobile,disease,email,password}=req.body
    //console.log(name,email,password,mobile,disease)
    const existingPatient=await Patient.findOne({email})
    if(existingPatient){
        return res.status(400).json({"message":"User already exists"})
    }
    const newPatient= new Patient({name,mobile,disease,email,password})
    await newPatient.save()
    res.status(201).json({"message":"patient created successfully"})
})

router.get("/getPatients", async (req, res) => {
    try {
        const patients = await Patient.find(); // Get all patients
        return res.status(200).json(patients); // Return the list of patients
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" }); // Handle potential errors
    }
});

router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    //console.log("from login route",email,password)
    const patient=await Patient.findOne({email})
    //console.log(patient)
    if(email==="admin" && password==="admin1@"){
        return res.status(200).json({"message":"admin logged in successfully",isAdmin:true})
    }

    if(!patient)
        return res.status(404).json({"message":"User not found"})
    const isMatch= await bcrypt.compare(password,patient.password)
    if(!isMatch)
        return res.status(400).json({"message":"Incorrect password"})
    return res.status(200).json({
        "message":"Valid user",
        "patientid":patient._id,
        isAdmin:false
    })
})

module.exports=router