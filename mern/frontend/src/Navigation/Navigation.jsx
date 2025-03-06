import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  console.log("patient id: ", localStorage.getItem('patientId'));
  const patientId = localStorage.getItem("patientId");
  const navigate = useNavigate();
  function handleLogout(e){
    e.preventDefault();
    localStorage.removeItem("patientId")
    navigate("/")
  }
  return (
    <div className="navbar">
        <Link to="/" className='link'>Home</Link>
        {
          patientId?(<Link className="link" onClick={handleLogout}>Logout</Link>):(
          <div>
            <Link to="/register" className='link'>Register</Link>
            <Link to="/login" className='link'>Login</Link>
          </div>
          )
        }
    </div>
  )
}
