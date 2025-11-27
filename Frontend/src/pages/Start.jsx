import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {


  return (
    <div>
      <div className='bg-[url(https://images.unsplash.com/photo-1518430272387-254558840136?q=80&w=1063&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover min-h-screen pt-9 flex flex-col justify-between w-full'>
        <h2 className='w-16 ml-8 text-white font-bold text-xl'>Uber</h2>
        <div className='bg-white pb-7 py-4 px-4'>
          <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
          <Link to="/user-login" className='w-full bg-black text-white py-3 rounded mt-4 font-semibold flex items-center justify-center'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start