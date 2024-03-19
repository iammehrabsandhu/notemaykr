import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';


function EditModal({onClose,data}){
    console.log(data);
    async function handleSubmit(e){
        e.preventDefault();
        document.getElementById('submitbtn').textContent="Wait";
            const formData={
                _id:data.id,
                title:e.target.title.value,
                content:e.target.content.value
            };
            const token=localStorage.getItem('token');
            console.log(formData);
            await axios.patch('https://notemaykr.onrender.com/edit',formData,{
                withCredentials: true,
                headers:{'Authorization':`Bearer ${token}`}
            }
            );
            window.location.reload(true);
            
        }
    return(
<div className="fixed h-screen inset-0 backdrop-blur-sm">
    <div className="flex flex-col mx-[35%] my-60 bg-white py-2 rounded-xl ">
        
        <form className="flex flex-col " onSubmit={handleSubmit}>
        <input required type="text" name="title" placeholder={data.Ttitle} className=" text-black py-3"></input>
        <textarea required type="textarea" maxLength={1200} multiline="true" rows={10}name="content"   className=" text-black pb-4">{data.Ccontent}</textarea>
        <button type="submit" id="submitbtn" className="bg-black p-2 text-white">Submit</button>
        </form>
        
        <button onClick={onClose} className="bg-white text-black p-2">close</button>
        
  
    </div>
</div>
    )
}

export default EditModal;