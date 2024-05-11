
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
  const [showL,setL]=useState(false);
  
  const user = localStorage.getItem('user');

  
  useEffect(()=>{setShow(true);  if(user){console.log(user);
    setL(true);}},[])
  return (
    <div>
      <div className='bg-white'>
      <div className='flex justify-between p-3  pt-4 fixed w-full bg-white border-b-2'>
      <h1 className='text-3xl text-black font-mono ' >N O T E  M A Y K R.</h1><div>

      {showL && <Link to="/notes"><button className=' p-2 text-black rounded-3xl px-4 hover:bg-white hover:text-gray-500 duration-500 mr-2'>Your Notes</button></Link>}
      {showL && <Link to="/PublicNotes"><button className=' p-2 text-black rounded-3xl px-4 hover:bg-white hover:text-gray-500 duration-500 mr-2'>Public Notes</button></Link>}
      {!showL && <button className='px-4 text-black rounded-3xl p-2 hover:bg-white hover:text-gray-500 duration-500 mr-2' onClick={()=>{setShowModal(true)}}>Register</button>}
      {!showL && <button className='px-4 text-black rounded-3xl p-2 hover:bg-white hover:text-gray-500 duration-500 mr-2'  onClick={()=>{setEModal(true)}}>Login</button>}
      {showL && <button className='px-4 text-black rounded-3xl p-2 hover:bg-white hover:text-gray-500 duration-500 mr-2' id="userNN" onClick={()=>{localStorage.clear();window.location.reload(true);}}>Logout</button>}
      {showModal && <NUserModal onClose={()=>{setShowModal(false)}}/>}
      {showEModal && <EUserModal onClose={()=>{setEModal(false)}}/>}
      </div> 
      </div> 
      <div className=' text-white md:px-16 mb-40 flex flex-row'>
      <div className={`sm:pt-[24%] pt-[65%] text-8xl font-bold transition-opacity ${show ? 'opacity-100' : 'opacity-0'} duration-1000  ease-in-out delay-300 text-black`}>Superior<br/> Note-Making</div>
        <div className={`sm:pt-[24%] pt-[65%] ml-[30%] transition-opacity text-2xl my-8 font-light flex flex-row ${show ? 'opacity-100' : 'opacity-0'} duration-1000 ease-in-out delay-700 text-black`}>
        <p>Organise & Execute. </p>
        </div>
      </div>
      <div className='flex flex-row bg-black md:pl-24 '>
        
        
        <div className='float-right font-light w-1/2 text-4xl mt-32 py-[12%] text-white'><p className='md:m-20'>Effortlessly plan and execute your tasks with precision. Streamline organization and seamless execution for optimal productivity.</p></div>
          <img src='/images/jp2.jpg' className=' w-1/2' />
      
      </div>
      <div className='bg-white text-black text-center  px-20 py-[10%] font-mono'>" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam "<br/>-Mehrab Sandhu</div>
    </div></div>
  );
}

export default App;
