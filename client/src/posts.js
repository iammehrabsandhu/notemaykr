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
       await axios.delete('http://localhost:3000/deleteID',{
       data:idD,
       withCredentials:true,
       headers:{'Authorization':`Bearer ${token}`}});
       window.location.reload(true);
    }
    async function patcher(){

    }
    return(
        <div className="w-80 h-auto flex flex-col  bg-gray-200 rounded-3xl overflow-hidden">
            <div className="p-2 bg-black flex text-white w-auto px-5 justify-between">
            <p className="p-1">{post.title}</p>
            <div><button className="p-1 mr-2" onClick={()=>{setShowModal(true)}} >Edit</button>
        {showModal && <EditModal onClose={()=>{setShowModal(false)}} data={post._id}/>}
            <button onClick={()=>{idTaker(post._id)}} id="deletebtn" className=" text-red-500 p-1">X</button></div></div>
            <h2 className="p-2"> {post.content}</h2>
        </div>
    )
}
export default Posts;