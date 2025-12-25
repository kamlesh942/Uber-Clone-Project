import React from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { Link } from 'react-router-dom'

const CaptainRiding = () => {
  return (
     <div className="h-screen">
      <div className=" fixed p-8 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16 mb-7"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Logo_image"
        />
        <Link
          to="/home"
          className="h-10 w-10 mb-7 bg-white flex items-center justify-center rounded-full "
        >
          <IoIosLogOut className="text-2xl" />
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber-map-img"
        />
      </div>
      <div className="h-2/5 p-6">
        {/* <CaptainDetails /> */}
      </div>
      
    </div>
  )
}

export default CaptainRiding