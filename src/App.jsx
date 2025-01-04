import { useEffect, useState } from 'react'
import Nav from './components/nav'
import Manager from './components/manager'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import './App.css'

import Login from './components/login'
import Signpg from './components/signup'
import { Navigate } from 'react-router-dom'
import { auth } from './firebase'
function App() {
  const [user,setuser]=useState(null);
  const [count, setCount] = useState(0)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setuser(user);
  })})
   const router=createBrowserRouter([
    {
      path:'/main',
      element:  <>
      <Nav/>
      <Manager/>
    </>
    },

    {
      path:'/',
      element:user?(<><Nav/><Manager/></>):(<Signpg/>)
    }
    ,
    {
      path:'/login',
      element:<Login/>
    }
    ,
    {
      path:'/signup',
      element:<Signpg/>
    }

   ])
  return (
   <>

   <RouterProvider router={router}/>
   </>
  )
}

export default App
