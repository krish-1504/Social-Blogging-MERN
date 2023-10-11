import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import {Navigate, useParams} from 'react-router-dom'

import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor'


 

export default function EditPost(){
    const {id}=useParams();
    const [title,settitle]=useState('')
    const [summary,setsummary]=useState('')
    const [content,setcontent]=useState('')
    const [file,setfile]=useState('')
    const [redirect,setredirect]=useState(false)
    useEffect(()=>{
        fetch('http://localhost:5001/post/'+id)
        .then(response=>{
            response.json().then(postInfo=>{
                settitle(postInfo.title)
                setcontent(postInfo.content)
                setsummary(postInfo.summary)
            })
        })

    },[])
    async function Updatepost(ev){
      
        const data=new FormData()
        data.set('title',title)
        data.set('summary',summary)
        data.set('content',content)
        data.set('id',id)
        if(file?.[0]){

            data.set('file',file?.[0])
        }
        ev.preventDefault()

     await fetch('http://localhost:5001/post',{
        method:'PUT',
        body:data,
        credentials:'include',
     }).then(response=>{
        if(response.ok){

            setredirect(true)
        }

     })
      
     

     
    }
    if(redirect){
      return (<Navigate to={'/post/'+id}/>)
    }
    return(
        <form onSubmit={Updatepost}>
            <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev=>settitle(ev.target.value)} />
            <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev=>setsummary(ev.target.value)} />
            <input type="file" 
            onChange={ev=>setfile(ev.target.files)}/>
            <Editor value={content} onChange={setcontent}/>
            <button style={{marginTop:'5px'}}>Update Post</button>
        </form>
    )
}