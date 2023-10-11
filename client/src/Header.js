

import { useContext, useEffect, useState} from "react"
import { Link,useNavigate} from "react-router-dom"
import { UserContext } from "./userContext"
import logo from './logo/logo.png'

export default function Header(){
  const navigate=useNavigate();

  const {setUserInfo,userInfo} =useContext(UserContext)



  useEffect(()=>{

    fetch('http://localhost:5001/profile',{
      credentials:'include',
    })
    .then(response=>{
      response.json().then(userInfo=>{

    setUserInfo(userInfo)


      })

    })

  },[])


  function logout(){
    fetch('http://localhost:5001/logout',{
      credentials:'include',
      method:'POST',
    })

    setUserInfo(null)
    navigate('/')
   
  }
 
  const username=userInfo?.username
    return(
        <header className="nav">
        <Link to={'/'} className='logo' ><img src={logo} alt="" /></Link>
        <nav>
          
           
          {username && (
            <>
            <Link to="/create" className="btn-cred">
              Create 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

              </Link>
            <a onClick={logout}>Logout</a>
            </>
          )} 
          {!username && (
            <>
          <Link to="/login" className="btn-cred">
            Login
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>

            </Link>
          <Link to="/register" className="btn-cred">
            Register
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>


          </Link>
           </>
          )}

        


          
        </nav>
      </header>
    )
}