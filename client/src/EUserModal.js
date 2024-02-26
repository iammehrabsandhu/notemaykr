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


    async function handleLogin(e){
        e.preventDefault();
       
        const formData={
            username:username,
            password:password
        }
            const response = await axios.post("http://localhost:3000/checkUser",formData, {
                withCredentials: true
            });
        // const t = Cookies.get('token');
        const cookies = document.cookie; 
        localStorage.setItem('cookies',cookies);
        const re = stringToObject(localStorage.getItem('cookies'));
        localStorage.setItem('token',re.token);
        const decodere = jwtDecode(re.token);
        localStorage.setItem('user',decodere.username);
        console.log(localStorage.getItem('user'));
        
    }
    return(
<div className="fixed h-screen inset-0 backdrop-blur-sm ">
    <div className="flex flex-col mx-[40%] my-60 bg-white py-2 rounded-xl ">
        
        <form className="flex flex-col"onSubmit={handleLogin}>
        <input required type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value);}}className="text-center py-3"></input>
        <input required type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value);}}className="text-center pb-4"></input>
        <p className="text-blue-700 text-right mr-1 q">click to create a new acc</p>
        <button type="submit" className="bg-black p-2 text-white text-center">Submit</button>

            </form>
        
        <button  className="bg-white text-black p-2" onClick={onClose}>Close</button>
        
  
    </div>
</div>
    )
}

export default EUserModal;