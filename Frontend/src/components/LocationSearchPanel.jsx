import React from "react";
import { FaLocationDot } from "react-icons/fa6";


const LocationSearchPanel = (props) => {
  // sample array for location
  const locations = [
    "Vaibhav cafe second floor Kamlesh Coding Plateform Satna",
    "Naman stores 1st floor Satna m.p",
    "Agravaal chai suttabar stores 1st floor Satna m.p",
    "Anmesh tayers stores 1st floor Satna m.p"
  ]
  return (
    <div>
    {
      locations.map(function(elem, idx){
        return <div key = {idx} onClick={()=>{
          props.setVehiclePanel(true)
          props.setpanelOpen(false)
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
