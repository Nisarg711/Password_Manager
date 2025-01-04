import React, { useState } from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth";
import { db } from '../firebase.js';
import { setDoc,doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './sign.css'
import { auth } from '../firebase.js';
import { Await } from 'react-router-dom';
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
    createUserWithEmailAndPassword(auth, register.email,register.password).then(async ()=>{
      const usr=auth.currentUser;
      if(usr)
      {
        await setDoc(doc(db,"Users",usr.uid),{
          name:register.name,
          email:register.email,
          password:register.password
         });
         toast('User registered Successfully!!', {
                         position: "top-right",
                         autoClose: 1000,
                         hideProgressBar: false,
                         closeOnClick: false,
                         pauseOnHover: true,
                         draggable: true,
                         progress: undefined,
                         theme: "light",
                       
                         }); 
         await delay(1500);
         window.location.href="/main";
      }
    }).catch((err)=>{
      alert(err.message);
    })
  
  
 

  }
  return (
    
    <div className='signup'>

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

     <div className="container3">
      <div className="img2"><img src="./pass.png" alt="" className="img4" /></div>
      <div className="form">
        <div className="heading moveht"><h1>Sign Up</h1></div>
        <div className="signname motion">
        <input type="text" placeholder='Enter Username' value={register.name} name='name' onChange={handlechange} className='ip3' />
        </div>
        <div className="email motion">
          <input type="text" className='ip3' value={register.email} name='email' onChange={handlechange} placeholder='Enter Email Id'/>
        </div>
        <div className="pwd motion">
          <input type="text" className='ip3' value={register.password} name='password' onChange={handlechange} placeholder='Enter Password' />
        </div>
        <div className="alv motion">Already have an account? <a href="/login" target='blank'> Click here.</a></div>
        <div className="btn3 motion2"><button className='bt motion2' onClick={handleregister}>Sign up</button></div>
      </div>
     </div>
    </div>
  )
}

export default signup
