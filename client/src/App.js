
import { Link } from 'react-router-dom';
import './App.css';
import NUserModal from './NUserModal.js';
import { useEffect } from 'react';
import { useState } from 'react';
import EUserModal from './EUserModal.js';


function App() {
  const [showModal,setShowModal]=useState(false);
  const [show, setShow] = useState(false);
  const [showEModal,setEModal]=useState(false);
  useEffect(()=>{setShow(true)},[])
  return (
    <div>
      <div className='bg-[url(./images/jp1.jpg)] bg-cover bg-fixed '>
      <div className='flex justify-between p-3 bg-black fixed w-full'>
      <h1 className='text-3xl text-white font-mono'>Notemaykr.</h1><div>

      <Link to="/notes"><button className=' p-2 text-white rounded-3xl px-4 hover:bg-white hover:text-black duration-500 mr-2'>Your Notes</button></Link>
      <Link to="/PublicNotes"><button className=' p-2 text-white rounded-3xl px-4 hover:bg-white hover:text-black duration-500 mr-2'>Public Notes</button></Link>
      <button className='px-4 text-white rounded-3xl p-2 hover:bg-white hover:text-black duration-500 mr-2' onClick={()=>{setShowModal(true)}}>Register</button>
      <button className='px-4 text-white rounded-3xl p-2 hover:bg-white hover:text-black duration-500 mr-2' onClick={()=>{setEModal(true)}}>Login</button>
      {showModal && <NUserModal onClose={()=>{setShowModal(false)}}/>}
      {showEModal && <EUserModal onClose={()=>{setEModal(false)}}/>}
      </div> 
      </div>
      <div className=' text-white px-16'>
      <div className={`pt-[24%] text-8xl font-bold transition-opacity ${show ? 'opacity-100' : 'opacity-0'} duration-1000 ease-in-out delay-300`}>Superior<br/> Note-Making</div>
      <div className={`pt-[2%]  transition-opacity text-2xl my-8 font-light ${show ? 'opacity-100' : 'opacity-0'} duration-1000 ease-in-out delay-700`}>Organise, Execute.</div>
      </div>
      <div className='flex justify-between  mt-32 py-[12%] rounded-t-[62px] bg-white px-24 '>
        
        <div className='text-center mx-48 shadow-lg p-5 rounded-3xl'>
         <h1 className='text-3xl mb-14 mt-10 font-extralight'>The Aim</h1>
          <p className='font-light'>You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:space-x-8 to apply the space-x-8 utility at only medium screen sizes and above.</p>
        </div> 
      </div>
      <div className='bg-black text-white text-center  px-20 py-[10%] font-mono'>" You can also use variant modifiers to target media queries like responsive breakpoints, dark mode, prefers-reduced "<br/>-Mehrab Sandhu</div>
    </div></div>
  );
}

export default App;
