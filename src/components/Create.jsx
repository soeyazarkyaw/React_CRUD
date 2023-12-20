import React, { useState } from 'react'
import { AiFillPhone } from 'react-icons/ai'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const Create = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');

  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  })

  const apiCreateContact = async(contact)=>{
    const {data} = await axios.post("http://localhost:3000/contact",contact)
    Toast.fire({
      icon: "success",
      title: "Create successfully"
    })
    navigate('/')
  }

  const submitHandler = e =>{
    e.preventDefault();
    const contact = {id: Date.now(),name,email,phone};
    apiCreateContact(contact);
  }
  return (
    <form  onSubmit={submitHandler} className='border-2 w-96 mx-auto mt-10 p-5 rounded-sm shadow-lg'>
      <h1 className='text-2xl font-bold my-3'>Create New Contact</h1>
      <div className='my-5'>
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
          <input value={name} onChange={e => setName(e.target.value)} type="text" id="website-admin" className="w-full rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0  text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name"/>
        </div>
      </div>
      <div className='my-5'>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            </svg>
          </div>
          <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com"/>
        </div>
      </div>
      <div className='my-5'>
        <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900">Your Phone</label>
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <AiFillPhone className='text-gray-400'/>
          </div>
          <input value={phone} onChange={e => setPhone(e.target.value)} type="number" id="input-group-2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="09xxxxxxxxx"/>
        </div>
      </div>
      <div className='my-5 flex justify-center'>
        <button type='submit' className='px-4 py-2 bg-black rounded uppercase text-white me-5'>Create</button>
        <Link to={'/'}><button className='px-4 py-2 bg-red-800 rounded uppercase text-white'>Cancle</button></Link>
      </div>
    </form>
  )
}

export default Create