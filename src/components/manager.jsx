import React, { useEffect, useRef, useState } from 'react'
import './manager.css'
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from "uuid";
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setDoc,getDoc,doc } from 'firebase/firestore';

const manager = () => {
   const siteref=useRef();
   const nameref=useRef()
   const passref=useRef();
   const [eye,seteye]=useState(1);
   const [modifypwd,setmodifypwd]=useState(0); 
    const [form,setform]=useState({site:"", username:"", password:""}) 
    const[passwordarray,setpasswordarray]=useState([]);
    const [details,setdetails]=useState(null);
    const handlechange=(e)=>{
        setform({...form,[e.target.name]:e.target.value});
        console.log("form is");
    }
  async  function fetchdetails(){
        auth.onAuthStateChanged(async (user)=>{
            console.log(user);
            const uid=user.uid;
             const docref=doc(db,"Users",uid);
             const docdetail=await getDoc(docref);
             if(docdetail.exists())
             {
                console.log("details ",docdetail.data());
                setdetails(docdetail.data());
             }
        })
    }
    useEffect(()=>{
        fetchdetails();
    },[]);
    
    useEffect(()=>{
        let pwd=localStorage.getItem("passwords");
        
        if(pwd)
        {   
            setpasswordarray(JSON.parse(pwd));
        }
    },[])
    async function logout()
    {
        await auth.signOut().then((user)=>{
            window.location.href="/login";
            console.log(user,"logged out");
        }).catch((err)=>{
            alert(err.message);
        })
    }
    async function savepwd(){
       
        if(form.site!="" && form.username!="" && form.password!="")
        {
            setform({ ...form, id: uuid() });

            setpasswordarray([...passwordarray,{...form,id:uuid()}]);
           
            localStorage.setItem("passwords",JSON.stringify([...passwordarray,{...form,id:uuid()}]));
            
            toast('Password Saved Successfully!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              
                });
            if(modifypwd==1)
            {
                setmodifypwd(0);
            }
           
            setform({...form,site:"",username:"",password:""});
            
        }
        else
        {
            toast('Each field should have minimum 5 characters!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              
                });
        }
        
    }

   function copytext(text){
    toast('Copied to Clipboard!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      
        });
        navigator.clipboard.writeText(text);
       
    }
    const deletepwd=(e)=>{
        let c=confirm("Are you sure you want to delete this password?");
        if(!c)
        {
            return;
        }
        console.log("Initial pwd",passwordarray);
        let obj=passwordarray.find((item)=>{
            return item.id===e.id;
        })
        if(!obj)
        {
            toast('Password deletion error!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              
                });
        }
        else
        {
            toast('Password deleted successfully!!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              
                }); 
                let arrtemp=passwordarray.filter((item)=>{
                    return item.id!==e.id;
                   })
                   setpasswordarray(arrtemp);
                 localStorage.setItem("passwords",JSON.stringify( passwordarray.filter((item)=>{
                    return item.id!==e.id;
                   })));
                   
        }
       
    }

    const editpwd=(e)=>{
        setform({...form,site:e.site,username:e.username,password:e.password});
        setpasswordarray(passwordarray.filter((item)=>{
            return item.id!==e.id;
           }));
        localStorage.setItem("passwords",JSON.stringify( passwordarray.filter((item)=>{
           return item.id!==e.id;
          })));
          setmodifypwd(1);
    }
    return (
      
        <>
        {details?( <div className='manage' style={{top:'0px'}}>

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
        
     <h1 style={{ textAlign: "center" }}><span className='gr'>&lt;</span>Pass<span className='gr'>N&beta;/&gt;</span></h1>
        <p>Password Manager</p>
        <div className="container">
         <div className="ip1" style={{ width: "100%" }}><input name='site' ref={siteref} type="text" onChange={handlechange} value={form.site} className='ht' placeholder="Enter Website URL" style={{ width: "100%", borderRadius: "10px", padding: "2px",height:'32px' }} /></div>
      <div className="ip2"><div className="name"><input name='username'  value={form.username}  ref={nameref} onChange={handlechange} type="text"className='ht' placeholder='Enter Username' style={{ width: "100%", borderRadius: "10px", padding: "2px" , height:'32px'}} /></div>
        <div  className='password' ><input name='password' onChange={handlechange} type={eye?"password":"text"} value={form.password} ref={passref} className='pass ht' placeholder='Enter Password'  style={{ width: "100%", borderRadius: "10px", padding: "2px", height:'32px'}} /> <img src="./icons/eye.png" onClick={(e)=>{
          if(eye)
            {
             e.target.src="./icons/delete.png";
                           
               seteye(0);
           }
            else
            {
             e.target.src="./icons/eye.png";
                            
            seteye(1);
             }
                        
             }} className='del' alt="" /> </div></div>
             <div className="btn" onClick={savepwd} ><button className='btn2'><lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>{modifypwd==0?"Add Password":"Modify Password"}</button></div>
             <h2 style={{textAlign:'center'}}>Your Passwords</h2>
            {passwordarray.length==0?<h4 style={{textAlign:'center'}}>No passwords to show</h4>: <div className='cover'> <table>
            <tbody>
              <tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
            </tr> 
            
            {
               
                passwordarray.map((e)=>{
                    return(
                        
                    <tr key={e.id}>

                        <td> <div className='cells' >
                            <div className="info"><a style={{color:'black', margin:'0px'}} target='blank' href={e.site}><p>{e.site}</p></a></div> 
                        <div>
                            <lord-icon className='icon' src="https://cdn.lordicon.com/depeqmsz.json"trigger="hover" onClick={()=>{copytext(e.site)}} >
                        </lord-icon>
                        </div>
                        </div> 
                        </td>
                        <td> <div  className='cells'><div className="info"><p>{e.username}</p></div>
                        <div><lord-icon cursor='pointer' src="https://cdn.lordicon.com/depeqmsz.json"trigger="hover"  onClick={()=>{copytext(e.username)}}>
                        </lord-icon>
                        </div> 
                        </div>
                         </td>
                        <td> <div className='cells'><div className="info" ><p>{e.password}</p></div> 
                        <div>
                        <lord-icon  cursor='pointer' onClick={()=>{copytext(e.password)}}  className="icon" src="https://cdn.lordicon.com/depeqmsz.json"trigger="hover" >
                        </lord-icon>
                        </div></div> </td>
                        <td><div className='edit' style={{display:'flex',justifyContent:'center'}}> <div>
                        <lord-icon className="icon"  onClick={()=>{editpwd(e)}} src="https://cdn.lordicon.com/jnikqyih.json" 
                             trigger="hover"  style={{cursor:'pointer'}}></lord-icon>
                        </div>
                        <div className='delete'   onClick={()=>{deletepwd(e)}}>
                        <lord-icon className="icon" src="https://cdn.lordicon.com/skkahier.json" 
                             trigger="hover"  style={{cursor:'pointer'}}></lord-icon>
                        </div>
                            </div></td>
                    </tr>)
                })
            }
            
             </tbody>
                  
          </table>

          </div>
          
          }
            
            <div className="btn" style={{top:'50px'}} onClick={logout} ><button className='btn2' style={{top:"40px" , flexDirection:'row'}}>Log Out</button></div>
      
        </div>
       

        </div>):(<div>Loading...</div>)}
        
        </>
       
    
    )
}

export default manager
