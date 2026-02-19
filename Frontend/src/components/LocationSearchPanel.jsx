import React from "react";
import { FaLocationDot } from "react-icons/fa6";
// import { setMaxListeners } from "../../../Backend/models/ride.model";
// import { set } from "mongoose";
import axios from "axios";



const LocationSearchPanel = ({suggetions, setVehiclePanel, setpanelOpen, setPickup, activeField, setDestination }) => {
  const handleSuggetionsClick = (suggetion) =>{
    if(activeField === "pickup"){
      setPickup(suggetion);
    }
    else if(activeField === "destination"){
      setDestination(suggetion);
    }
    // setVehiclePanel(true)
    // setpanelOpen(false)
  }

  return (
    <div>
    {
      suggetions.map(function(elem, idx){
         <div key = {idx} onClick={()=>{
          handleSuggetionsClick(elem)
          
        }} className="flex gap-4  border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-4 justify-start">
        <h2 className=" bg-[#eee] flex items-center justify-center h-5 w-10 rounded-full">
             <FaLocationDot />
        </h2>
        <h4 className="font-medium">{elem}</h4>
      </div>
      })
    }
    </div>
      
  )
   
  
};

export default LocationSearchPanel;
