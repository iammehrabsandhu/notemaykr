import { Link } from "react-router-dom";
import PostModal from "./PostModal";
import Posts from "./posts";
import { useState,useEffect } from "react";
import axios from "axios";
import { JwtDecode, jwtDecode } from "jwt-decode";


 function PublicNotes() {
  const [showModal,setShowModal]=useState(false);
  const [blog,setBlogs]=useState([]);
  
  function stringToObject(re) {
    return re.split('; ').reduce((prev, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
      }, {});
}
  //const re = stringToObject(localStorage.getItem('cookies'));
  //const decodere = jwtDecode(re.token);
  //console.log(decodere);
  const username = localStorage.getItem('user');
  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const response =  await axios.get('https://notemaykr.onrender.com/PublicBlogs',{
        params:{user:user},
        withCredentials:true,
        headers:{'Authorization':`Bearer ${token}`}});
     
      setBlogs(response.data);
    };

    fetchData();
  }, []);
      
  return (
   <div>
      <div className='flex justify-center p-3 bg-gray-300 border-b-0 py-4'>
      <h1 className='text-3xl text-black font-mono'><a href="/">N O T E  M A Y K R.</a></h1>
     
      </div>
      <div className="flex py-1 mt-10 mb-10 justify-center">
        <h1 className="mx-5">Welcome, {username}.</h1>
        <p>|</p>
        <button  onClick={()=>{setShowModal(true)}} className="mx-5 text-gray-700 ">Create new note</button>
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

export default PublicNotes;
