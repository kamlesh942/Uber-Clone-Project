import React from 'react'

const Home = () => {
  return (
    <div className='w-screen h-screen relative'>
     
      <img className='w-20 absolute left-5 top-5' src="https://brandeps.com/logo-download/U/Uber-logo-02.png" alt="Uber-Logo" />
      <div className="h-screen w-screen">
        {/* for temporary purpose */}
        <img className='h-full w-full' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Uber-map-img" />
      </div>
      <div className='bg-white absolute top-0 w-full p-5'>
        <h4 className='text-3xl font-semibold'>Find a Trip</h4>
        <form>
          <input className='bg-[#eee] px-8 py-2 text-lg rounded-lg mt-5' type="text" placeholder='Add a Pick-up Location' />
          <input className='bg-[#eee] px-8 py-2 text-lg rounded-lg mt-5' type="text" placeholder='Enter Your Destinatio' />
        </form>
      </div>
    </div>
  )
}

export default Home