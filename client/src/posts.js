import React, { useState } from "react";
import axios from 'axios';
import EditModal from "./EditModal";
function Posts({post}){
    const [showModal,setShowModal] = useState(false);

    async function idTaker(idx){
        document.getElementById('deletebtn').textContent="Wait";
        const idD={id:idx};
        console.log(JSON.stringify(idD));
        
        const token = localStorage.getItem('token');
       await axios.delete('https://notemaykr-av5v.vercel.app/deleteID',{
       data:idD,
       withCredentials:true,
       headers:{'Authorization':`Bearer ${token}`}});
       window.location.reload(true);
    }
    async function patcher(){

    }
    return(
        <div className="w-80 h-auto flex flex-col  bg-white border-2 rounded-3xl overflow-hidden">
            <div className="p-2 bg-gray-200 flex text-black w-auto px-5 justify-between">
            <p className="p-1">{post.title}</p>
            <div><button className="p-1 mr-2 hover:text-gray-500" onClick={()=>{setShowModal(true)}} >Edit</button>
        {showModal && <EditModal onClose={()=>{setShowModal(false)}} data={{id:post._id,Ccontent:post.content,Ttitle:post.title}}/>}
            <button onClick={()=>{idTaker(post._id)}} id="deletebtn" className=" text-red-500 p-1">X</button></div></div>
            <h2 className="p-2 whitespace-pre-wrap">{post.content}</h2>
        </div>
    )
}
export default Posts;