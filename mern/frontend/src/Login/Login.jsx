import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [username, setUserName] = useState("")
    const[password, setPassword] = useState("")
    const navigate = useNavigate()

    function handlelogin(e){
        e.preventDefault();
        const user = {email: username, password}
        console.log(user)
        const nurl = "http://localhost:4000/api/patients/login"
        axios.post(nurl, user).then((res)=>{
            if(res.status === 200){
                localStorage.setItem("patientId", res.data.patientid)
                // alert("logged in successfully")
                navigate("/")
            }
            console.log(res)
        })
        .catch((err)=>{
            if(err.status === 400)
                alert("error while logging in")
            console.log(err)
        })
    }
  return (
    <div className="container mt-3 p-3">
      <div className="row d-flex justify-content-center">
        <form className="col-12 col-md-6 shadow-lg p-4 bg-light rounded">
         
           <div>
            <h3 >Hospital Login Form</h3>
           </div>

         
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-primary">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
              onChange={(e)=>setUserName(e.target.value)}/>
          </div>

         
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label text-primary">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            onClick={handlelogin}>
            Submit
          </button>
        </form>
      </div>
    </div>

  )
}
