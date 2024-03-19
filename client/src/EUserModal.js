import React from "react";
import { useState } from "react";
import { Cookies, useCookies,get } from 'react-cookie';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function EUserModal({onClose}){
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const token=useCookies(['token']);


    function stringToObject(re) {
        return re.split('; ').reduce((prev, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');
            return prev;
          }, {});
    }
    function clearCookies() {
        document.cookie.split("; ").forEach(cookie => {
          const [name] = cookie.split("=");
          document.cookie = name + "=; path=/;";
        });
      }

    async function handleLogin(e){
        e.preventDefault();
        document.getElementById('Euserbtn').textContent='Wait';
        //console.log(document.cookie);
        //clearCookies();
        //console.log(document.cookie)
        localStorage.clear();
        const formData={
            username:username,
            password:password
        }
        
            // Send POST request to the server
            const response = await axios.post("https://notemaykr.onrender.com/checkUser", formData, {
                withCredentials: true
            });
            // Access the cookie after the request succeeds
            const cookies = document.cookie;
            console.log(cookies+" cookie hai");
            // Store the data in local storage
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token')+" localStorage k kaam");
            const decode = jwtDecode(localStorage.getItem('token'));
            localStorage.setItem('user',decode.username);
            window.location.reload(true);
        
    }
            // const t = Cookies.get('token');
        /*const cookies = document.cookie; 
        console.log(cookies);
        localStorage.setItem('cookies',cookies);
        const re = stringToObject(localStorage.getItem('cookies'));
        localStorage.setItem('token',re.token);
        console.log(localStorage.getItem('cookies'));
        const decodere = jwtDecode(re.token);
        console.log(localStorage.getItem('user'));
        localStorage.setItem('user',decodere.username);*/
    return(
<div className="fixed h-screen inset-0 backdrop-blur-sm ">
    <div className="flex flex-col mx-[40%] my-60 bg-white py-2 rounded-xl border-2 ">
        
        <form className="flex flex-col"onSubmit={handleLogin}>
        <input required type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value);}}className="text-center py-3"></input>
        <input required type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value);}}className="text-center pb-4"></input>
        
        <button type="submit" className="bg-black p-2 text-white text-center" id="Euserbtn">Login</button>

            </form>
        
        <button  className="bg-white text-black p-2" onClick={onClose}>Close</button>
        
  
    </div>
</div>
    )
}

export default EUserModal;