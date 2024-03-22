import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [email,setEmail]=useState("");
    const emailHandler=(e)=>{
        setEmail(e.target.value);
    }
    const sendEmailhandler = async()=>{
        try{
           const data = await fetch('http://localhost:5000/send-email',{
               method:'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email:email })
           }).then(res => res.json())
           .then(data => {
            toast("email sent!")
            setEmail("")
           }
            )

        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <div className='h-[100vh] w-[100vw] bg-slate-300 flex flex-col justify-center items-center'>
    <ToastContainer />
      <div>
        <form className='flex flex-col items-center justify-center gap-5 bg-black p-10 text-white  rounded-3xl' onSubmit={(e)=>e.preventDefault()}>
        <div className='flex  justify-center items-center gap-3'>
        <label  className='text-3xl'>Email : </label>
            <input type='email' placeholder='Enter your email address' id='email' value={email} onChange={emailHandler} className='p-2 rounded-2xl w-[40vw]' />
        </div>
            <button className='border p-2 bg-red-500 rounded-md text-white ' onClick={()=>sendEmailhandler()}> Send Email</button>
        </form>
      </div>

    </div>
  )
}

export default Form