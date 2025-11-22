import React, { use, useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log( email, password);
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img className='w-16 mb-7' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
      <form onSubmit={(e)=>{
        
        submitHandler(e)
        
        }}
        >

        <h3 className='text-lg mb-2'>What's your email</h3>
        <input 
        value={email}
        onChange= {(e)=> setEmail(e.target.value)}
        className='bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-full text-lg placeholder:text-lg' type="email" placeholder='example@gmail.com' required/>
        <h3 className='text-lg mb-2'>Password</h3>
        <input 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className='bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-full text-lg placeholder:text-lg' type="password" placeholder='Enter your password' required/>
        <button className='bg-[#212121] text-white mb-3 py-2 px-5 font-semibold rounded-lg w-full' type="submit">Login</button>
        
      </form>
        <p className='text-center mb-2'>New here? <Link to="/user-signup" className='text-blue-600 font-semibold'>Create new Account</Link></p>
      </div>
      <div>
        <button className='bg-[#10b461] text-white mb-7 py-2 px-5 font-semibold rounded-lg w-full'>SignIn as Captian</button>
      </div>
    </div>
  )
}

export default UserLogin