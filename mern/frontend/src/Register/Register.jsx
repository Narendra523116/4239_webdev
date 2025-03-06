import React, {useState} from 'react'
import axios from "axios";

function Register(){

    const [name, setName] = useState("")
    const [disease, setDisease] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState(null)

    function addPatient(e){
        e.preventDefault()
        const newPatient = {name, email, password, mobile, disease};
        console.log(newPatient)
        const URL = "https://hospital-mern-2644.onrender.com"
        const nurl = "http://localhost:4000/api/patients/addPatient"
        axios.post(nurl, newPatient).then((res)=>{
            if(res.status === 201)
                alert("Patient added successfully")
            console.log(res)
        })
        .catch((err)=>{
            if(err.status === 400)
                alert("Usename already taken")
            console.log(err)
        })

    }

    return(
        <div className="container mt-3 p-3">
        <div className="row d-flex justify-content-center">
        <form className="col-12 col-md-6 shadow-lg p-4 bg-light rounded">
         
           <div>
            <h3 className="">Hospital Register Form</h3>
           </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-success">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              onChange={(e)=>setName(e.target.value)}/>
          </div>

       
          <div className="mb-3">
            <label htmlFor="disease" className="form-label text-success">Disease</label>
            <input
              type="text"
              className="form-control"
              id="disease"
              placeholder="Enter the disease"
              onChange={(e)=>setDisease(e.target.value)}/>
          </div>

         
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-success">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}/>
          </div>

         
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-success">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}/>
          </div>

       
          <div className="mb-3">
            <label htmlFor="mobile" className="form-label text-success">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Enter your mobile number"
              onChange={(e)=>setMobile(e.target.value)}/>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            onClick={addPatient} >
            Submit
          </button>
        </form>
      </div>
    </div>

    )
}

export default Register;