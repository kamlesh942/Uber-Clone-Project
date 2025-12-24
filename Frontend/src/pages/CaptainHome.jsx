import React, {useState, useRef} from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";


const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);  
  const ridePopUpPanelRef = useRef(null);
  const ConfirmRidePopUpPanelRef = useRef(null);  

   useGSAP(function(){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current, {
        transform : 'translateY(0)',
        opacity: 1,

      })
    }else{
      gsap.to(ridePopUpPanelRef.current, {
        transform : 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

    useGSAP(function(){
    if(ConfirmRidePopUpPanel){
      gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform : 'translateY(0)',
        opacity: 1,

      })
    }else{
      gsap.to(ConfirmRidePopUpPanel.current, {
        transform : 'translateY(100%)'
      })
    }
  }, [ConfirmRidePopUpPanel])

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
        <CaptainDetails />
      </div>
      <div ref = {ridePopUpPanelRef} className="fixed bottom-0 w-full bg-white px-3 py-4 ">
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>

      <div ref = {ConfirmRidePopUpPanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white px-3 py-6">
        <ConfirmRidePopUp setConfirmRidePopUpPanel= {setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
