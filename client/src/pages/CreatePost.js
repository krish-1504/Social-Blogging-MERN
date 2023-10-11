import { useState } from 'react'
import ReactQuill from 'react-quill'
import {Navigate} from 'react-router-dom'

import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor';


  

export default function CreatePost(){
    const [title,settitle]=useState('')
    const [summary,setsummary]=useState('')
    const [content,setcontent]=useState('')
    const [file,setfile]=useState('')
    const [redirect,setredirect]=useState(false)
    async function createnewpost(ev){
      const data=new FormData()
      data.set('title',title)
      data.set('summary',summary)
      data.set('content',content)
      data.set('file',file[0])
      ev.preventDefault()
      const response=await fetch('http://localhost:5001/post',{
        method:'POST',
        body:data,
        credentials:'include',
      })
      if(response){
        setredirect(true)
      }



    }
    if(redirect){
      return (<Navigate to={'/'}/>)
    }
    return(
        <form onSubmit={createnewpost}>
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
            <button style={{marginTop:'5px'}}>Post</button>
        </form>
    )
}