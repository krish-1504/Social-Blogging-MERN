
import { useContext, useState } from "react"
import {Link, Navigate} from 'react-router-dom'
import { UserContext } from "../userContext"



export default function LoginPage(){
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    const [redirect,setredirect]=useState(false)
    const {setUserInfo}=useContext(UserContext)

    async function login(ev){
        ev.preventDefault();
        

               const response=await fetch('http://localhost:5001/login',{
                method:'POST',
                body:JSON.stringify({username,password}),
                headers:{'Content-Type':'application/json'},
                credentials:'include',
            })
            if(response.ok){
                response.json().then(userInfo=>{
                   setUserInfo(userInfo)
                    setredirect(true)
                })
            }
            else{
                alert('wrong credentials')
            }
            
   
        
        
    
    }

    if(redirect){
        return (<Navigate to={'/'}/>)
    }

    return(
        
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
            placeholder="user name" 
            value={username}
            onChange={ev=>setusername(ev.target.value)}/>
            <input type="password" 
            placeholder="enter password"
            value={password}
            onChange={ev=>setpassword(ev.target.value)} />
            <button>Login</button>
            <label className="label">

            Don't have account?  
            <Link to='/register'>Register</Link>
            </label>

            
        </form>
    )
}