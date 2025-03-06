import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import './Home.css';

export default function Home() {

  const [doctors, setDoctors] = useState()
  const [doctorId,setDoctorId] = useState(null)
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId"))
  const [appointmentDate, setAppointmentDate] = useState(null)
  const [appointmentTime, setAppointmentTime] = useState(null)
  const navigate = useNavigate()

  function handleConfirm(event){
    event.preventDefault()
    const newAppointment = {patientId, doctorId, time: appointmentTime, date: appointmentDate}

    if(!appointmentDate && !appointmentTime){
      alert("appointment time & appointment date are required")
      return
    }

    if(!appointmentDate){
      alert("appointment date required")
      return
    }

    if(!appointmentTime){
      alert("appointment time required")
      return
    }


    axios.post("http://localhost:4000/api/appointments/add", newAppointment).then((res)=>{
      console.log(res)
      if(res.status == 201){
        alert("APointment booked succesfully")
        setDoctorId(null)
        setAppointmentDate(null)
        setAppointmentTime(null)
      }
    }).catch((e)=>alert("unexpected error occured"))

  }

  useEffect(()=>{
    fetchDoctors()
  }, [])

  useEffect(()=>{
    console.log('doctor id : ' ,doctorId);
    console.log('patient is : ', patientId);
  }, [patientId])

  async function fetchDoctors(){
    await axios.get("http://localhost:4000/api/doctors")
    .then((res)=>{
      console.log(res.data)
      setDoctors(res.data)
    })
  }

  function chekPatientId(){
    console.log("this is narendra in function checkpatient id")
    if(!patientId){
      alert("you have to login in first for booking appoinments, redirecting to login page👨‍💻")
      navigate("/login");
      return;
    }
  }

  return(
    <div className="container">
      <div className='container'><h1 className="" style={{textAlign:'center'}}>Doctors</h1></div>
      <div className="row">
        {
          doctors && doctors.map((doctorItem)=>{
            return <div key={doctorItem._id} className="mt-2 col-12 col-sm-6 col-md-4 card h-100 m-2" style={{width:"20rem"}}>
              <div className="card-body">
                <h5 className="card-title">{doctorItem.specializaton}</h5>
                <p className="card-text">{doctorItem.name}</p>
                <p className="card-text">{doctorItem.designation}</p>
                <p className="card-text">{doctorItem.email}</p>
                <p className="card-text">{doctorItem.mobile}</p>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={(e)=>{chekPatientId();setDoctorId(doctorItem._id)}}>Book Appointment</button>
                </div>
            </div>
          })
        }
      </div>

      {   
        doctorId && <div className="modal show d-block" id="exampleModal" tabIndex="-1" role='modal' aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Appointment Schedule</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setDoctorId(null)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Appointment Date</label>
                    <input type="date" className="form-control" id="recipient-name" onChange={(e)=>setAppointmentDate(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">Appointment Time</label>
                    <input type="time" className="form-control" id="recipient-name" onChange={(e)=>setAppointmentTime(e.target.value)}/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setDoctorId(null)}>Close</button>
                <button  onClick={handleConfirm} type="button" className="btn btn-success">Confirm Appointment</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
