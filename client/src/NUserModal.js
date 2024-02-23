import React from "react";
import { useState } from "react";
import axios from "axios";
function NUserModal({onClose}){
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const token=useState('');
    async function handleLogin(e){
        
        e.preventDefault();
        document.getElementById('newuserbtn').textContent='Adding user';
        const formData = {
            username:username,
            password:password
        }
        await axios.post("http://localhost:3000/newUser",formData);
        window.location.reload(true);
    }
    return(
<div className="fixed h-screen inset-0 backdrop-blur-sm">
    <div className="flex flex-col mx-[35%] my-60 bg-white py-2 rounded-xl ">
        
            <form className="flex flex-col"onSubmit={handleLogin}>
        <input required type="text" placeholder="create a username" value={username} onChange={(e)=>{setUsername(e.target.value);}}className="text-center py-3"></input>
        <input required type="text" placeholder="set password" value={password} onChange={(e)=>{setPassword(e.target.value);}}className="text-center pb-4"></input>
        <button type="submit" id="newuserbtn"className="bg-black p-2 text-white">Submit</button>

            </form>
        
        <button  className="bg-white text-black p-2" onClick={onClose}>close</button>
        
  
    </div>
</div>
    )
}

export default NUserModal;