import React, { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase.js';
import { setDoc,doc } from 'firebase/firestore';
import './login.css'
import { auth } from '../firebase.js';

const signup = () => {
  const [register,setregister]=useState({name:"", email:"", password:""});

  const handlechange=(e)=>{
    setregister({...register,[e.target.name]:e.target.value});
    
  }

  async function delay (d){
    return new Promise((res,rej)=>{
        setTimeout(() => {
            res("done");
        }, d);
    })
  }
  async function handleregister(e){
    e.preventDefault();

    try{
        await signInWithEmailAndPassword(auth, register.email,register.password);
        const usr=auth.currentUser;
    console.log("After delay!!!");
      window.location.href="/main";
        
    }
    catch(err){
        toast.error("Invalid email or password");
        console.log(err);
    }
  
  }
  return (
    
    <div className='login'>
        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
                />
     <div className="container2">
      <div className="img2"><img src="./pass.png" alt="" className="img4" /></div>
      <div className="form">
        <div className="heading moveht"><h1>Log in</h1></div>
       
        <div className="email motion">
          <input type="text" className='ip3' value={register.email} name='email' onChange={handlechange} placeholder='Enter Email Id'/>
        </div>
        <div className="pwd motion">
          <input type="text" className='ip3' value={register.password} name='password' onChange={handlechange} placeholder='Enter Password' />
        </div>
       
        <div className="btn3 motion2"><button className='bt' onClick={handleregister}>Sign up</button></div>
        <div className="alv">New User? <a href="/signup" target='blank'>Register here.</a></div>
      </div>
     </div>
    </div>
  )
}

export default signup
