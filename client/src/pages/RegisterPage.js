import { useState } from "react"




export default function RegisterPage(){
    const [username,setusername]=useState('')
    const [password,setpassword]=useState('')
    async function register(ev){
        ev.preventDefault();
        

         const response=   await fetch('http://localhost:5001/register',{
                method:'POST',
                body:JSON.stringify({username,password}),
                headers:{'Content-Type':'application/json'},
            })
            
            if(response.status===200){
                alert('Registration succesfull')
            }
            else{
                alert('Registration failed')

            }
        
        
    
    }
    return(
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
            placeholder="user name"
            value={username}
            onChange={ev=>setusername(ev.target.value)} />


            <input type="password" 
            placeholder="enter password" 
            value={password}
            onChange={ev=>setpassword(ev.target.value)}/>
            <button>Register</button>
            
        </form>
    )
}