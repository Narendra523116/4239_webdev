import { post } from 'axios';

document.addEventListener('DOMContentLoaded', function(event){
    event.preventDefault();
    const form = document.getElementById('register-form');
    console.log(form)
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let username = document.getElementById("tname").value
        let password = document.getElementById("tpass").value

        console.log(`username : ${username} password : ${password}`)

        handlevent(username, password)
    })
})

async function handlevent(username, password){
    const {data} = await post('http://localhost:4000/api/auth/register', {
        username : username,
        password : password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    console.log(data)
}