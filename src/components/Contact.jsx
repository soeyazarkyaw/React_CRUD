import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const Contact = () => {
    const [contacts,setContacts] = useState([])

    const swalWithButtons = Swal.mixin({
      customClass: {
        confirmButton: "px-5 py-1 bg-red-800 text-white rounded shadow",
        cancelButton: "px-5 py-1 bg-green-800 text-white rounded shadow me-5"
      },
      buttonsStyling: false
    })

    const getContacts = async()=>{
        const {data} = await axios.get("http://localhost:3000/contact")
        setContacts(data)
    }

    useEffect(()=>{
        getContacts() 
    },[])

    const apiDeleteContact = async(id) =>{
        
        swalWithButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
              swalWithButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              const {data} = await axios.delete(`http://localhost:3000/contact/${id}`)
                getContacts()
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          })
    }
  return (
    <>
    <Link to={"/create"} ><button className=' bg-black text-cyan-50 px-2 py-3 rounded-md text-sm ms-10 my-5'>Create New Contact</button></Link>
    <div className='px-10 py-3 mx-auto'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contacts?.map((contact)=>(
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {contact.name}
                        </th>
                        <td className="px-6 py-4">{contact.email}</td>
                        <td className="px-6 py-4">{contact.phone}</td>
                        <td className="px-6 py-4 flex items-center gap-3">
                            <AiFillDelete onClick={()=>apiDeleteContact(contact.id)} className='text-xl text-red-500 cursor-pointer'/>
                            <Link to={`/edit/${contact.id}`}><AiFillEdit className='text-xl text-green-500 cursor-pointer'/></Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    </>
  )
}

export default Contact