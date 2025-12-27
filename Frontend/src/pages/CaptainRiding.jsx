import React, { useRef, useState} from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { RiArrowDropUpLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const CaptainRiding = () => {
    const FinishRideRef = useRef(null); 
    const [FinishRidePanel, setFinishRidePanel] = useState(false);
  useGSAP(function(){
    if(FinishRidePanel){
      gsap.to(FinishRideRef.current, {
        transform : 'translateY(0)',
        opacity: 1,

      })
    }else{
      gsap.to(FinishRideRef.current, {
        transform : 'translateY(100%)'
      })
    }
  }, [FinishRidePanel])

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
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber-map-img"
        />
       
      </div>
      <div className="h-1/5 p-6 bg-yellow-400 flex items-center justify-between relative " 
      onClick={()=>{
        setFinishRidePanel(true)
      }}>

      <h5 onClick={()=>{
           }} 
          className="p-1 text-center w-full absolute top-0">
            <RiArrowDropUpLine className='text-3xl ml-[40%] text-gray-200 '/>
        </h5>
        <h4 className="text-xl font-semibold">4 KM Away</h4>
        <button
        className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg '>Complete Ride</button>
      </div>

       <div ref= {FinishRideRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white px-3 py-6">
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
      
    </div>
  )
}

export default CaptainRiding