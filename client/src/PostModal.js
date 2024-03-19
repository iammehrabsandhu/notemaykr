import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';


function PostModal({onClose}){
        const [check,setCheck]=useState(false);
        async function checkedf(e){
            await setCheck(e.target.checked);
        }
    async function handleSubmit(e){
        
        e.preventDefault();
        const currUser = localStorage.getItem('user');
        console.log(currUser);
        document.getElementById('submitbtn').textContent="Wait";
            const formData={
                title:e.target.title.value,
                content:e.target.content.value,
                author:currUser,
                public:check

            };
            const re = localStorage.getItem('token');
            console.log(formData);
            await axios.post('https://notemaykr.onrender.com/blogs',formData, {
                withCredentials: true,
                headers:{'Authorization':`Bearer ${re}`}
            });

        }
    return(
<div className="fixed h-screen inset-0 backdrop-blur-sm">
    <div className="flex flex-col mx-[35%] my-60 bg-white py-2 rounded-xl ">
        
        <form className="flex flex-col " onSubmit={handleSubmit}>
        <input required type="text" name="title" placeholder="Title of your note" className=" py-3"></input>
        <input required type="text-area" name="content"  placeholder="Note content" className="pb-4"></input>
        <p >Public ?</p><input type="checkbox" placeholder="public" className="float-right" checked={check} onChange={checkedf}></input>
        <button type="submit"  id="submitbtn" className="bg-black p-2 text-white">Submit</button>
        </form>
        
        <button onClick={onClose} className="bg-white text-black p-2">close</button>
        
  
    </div>
</div>
    )
}

export default PostModal;

