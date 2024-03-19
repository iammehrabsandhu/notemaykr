import { Link } from "react-router-dom";
import PostModal from "./PostModal";
import Posts from "./posts";
import { useState,useEffect } from "react";
import axios from "axios";
import { JwtDecode, jwtDecode } from "jwt-decode";

 function PrivN() {
  const [showModal,setShowModal]=useState(false);
  const [blog,setBlogs]=useState([]);
  

  const re =  localStorage.getItem('token');
  //const decodere = jwtDecode(re.token);
  const decodere = jwtDecode(re);
  useEffect(() => {
    const fetchData = async () => {
      //console.log(re.token); 
      const response =  await axios.get('https://notemaykr.onrender.com/PrivBlogs',{
        params:{
          user:localStorage.getItem('user')
        }
      ,
        withCredentials:true,
        headers:{'Authorization':`Bearer ${re}`}
    });
      
       setBlogs(response.data);
       
    };

    fetchData();
  }, []);
  return (
   <div>
      <div className='flex justify-center py-3 bg-gray-300 border-b-0 py-4'>
      <h1 className='text-3xl text-black font-mono'><a href="/">N O T E  M A Y K R.</a></h1>
     
      </div>
      <div className="flex py-1 mt-10 mb-10 justify-center">
        <h1 className="mx-5">Welcome, {decodere.username}.</h1>
        <p>|</p>
        <button  onClick={()=>{setShowModal(true)}} className="mx-5 hover:text-gray-500 ">Create new note</button>
        {showModal && <PostModal onClose={()=>{setShowModal(false)}}/>}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5 mb-10 mx-10">
      {blog.map(post => (
        <Posts key={post.id} post={post} />
      ))}
      </div>
   </div>
  );
}

export default PrivN;
