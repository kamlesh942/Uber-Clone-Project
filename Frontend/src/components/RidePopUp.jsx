import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { HiCurrencyRupee } from "react-icons/hi2";



const RidePopUp = () => {
  return (
    <div>

        <h5 onClick={()=>{
                          props.setVehiclePanel(false);
                          }} 
                          className="absolute top-6 right-6 text-2xl">
                          <IoIosArrowDown />
              </h5>
              <h3 className="text-2xl font-semibold mb-5">Confirm Ride</h3>
              <div className="flex gap-2 justify-between flex-col items-center">
                    <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAeFmvyzZoJz2iCdXy19QhPSXOmzg-j25uQ&s" alt="Car Image" />
                    <div className='w-full mt-5'>
                          <div className='flex items-center gap-5 p-3 border-b-2'>
                          <FaLocationDot />
                            <div>
                              <h3 className="text-lg font-medium">562/11-A</h3>
                              <p className="text-sm">Kankariys Talab, Satna</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-5 p-3 border-b-2'>
                          <FaLocationDot />
                            <div>
                              <h3 className="text-lg font-medium">562/11-A</h3>
                              <p className="text-sm">Kankariys Talab, Satna</p>
                            </div>
                          </div>
                          <div className='flex items-center gap-5 p-3 border-b-2'>
                          <HiCurrencyRupee />
        
                            <div>
                              <h3 className="text-lg font-medium">₹193.20</h3>
                              <p className="text-sm">Cash Cash</p>
                            </div>
                          </div>
                    </div>
                    <button onClick = {
                      ()=>{
                        props.setConfirmRidePanel(false);
                        props.setVehicleFound(true);
                      }
                    } className='w-full mt-8 bg-green-600 text-white font-semibold p-2 rounded-lg '>Confirm</button>
              </div>
    </div>
  )
}

export default RidePopUp