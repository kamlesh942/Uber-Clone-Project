import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import ConfirmRide from './ConfirmRide';

const VehiclePanel = (props) => {
   if (!props.fare) {
    return (
      <div className="p-4 text-center text-gray-600">
        Calculating fare...
      </div>
    );
  }
  
  return (
       <div>
        <h5 onClick={()=>{
            props.setVehiclePanel(false);
            }} 
            className="absolute top-6 right-6 text-2xl">
            <IoIosArrowDown />
        </h5>
              <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
              <div onClick={()=>{
                props.selectVehicle("car")          
                props.setConfirmRidePanel(true)
                // props.setVehiclePanel(false)
              }} className="flex border-2 active:border-black rounded-xl mb-2 w-full p-2 items-center justify-center">
                <img className="h-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAeFmvyzZoJz2iCdXy19QhPSXOmzg-j25uQ&s" alt="Car Image" />
                <div className="ml-3 w-1/2 px-5" >
                  <h4 className="flex font-medium text-base">UberGo <span className="flex ml-1 gap-1"><FaUser /> 4 </span></h4>
                  <h5 className="font-medium text-sm">2 mins away</h5>
                  <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹{props.fare.car}</h2>
              </div>
              <div onClick={()=>{
                props.selectVehicle("motorcycle")
                props.setConfirmRidePanel(true)
                // props.setVehiclePanel(false)
              }} className="flex border-2 active:border-black rounded-xl mb-2 w-full p-2 items-center justify-center">
                <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="motercycle Image" />
                <div className="ml-3 w-1/2 px-5" >
                  <h4 className="flex font-medium text-base">UberGo <span className="flex ml-1 gap-1"><FaUser /> 1 </span></h4>
                  <h5 className="font-medium text-sm">3 mins away</h5>
                  <p className="font-normal text-xs text-gray-600">Affordable, motor cycle rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹{props.fare.motorcycle}</h2>
              </div>
              <div onClick={()=>{
                props.selectVehicle("auto")
                props.setConfirmRidePanel(true)
                // props.setVehiclePanel(false)
              }} className="flex border-2 active:border-black rounded-xl mb-2 w-full p-2 items-center justify-center">
                <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="auto Image" />
                <div className="ml-3 w-1/2 px-5" >
                  <h4 className="flex font-medium text-base">UberGo <span className="flex ml-1 gap-1"><FaUser /> 3 </span></h4>
                  <h5 className="font-medium text-sm">4 mins away</h5>
                  <p className="font-normal text-xs text-gray-600">Affordable, auto rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹{props.fare.auto}</h2>
              </div>
      </div>
  )
}

export default VehiclePanel