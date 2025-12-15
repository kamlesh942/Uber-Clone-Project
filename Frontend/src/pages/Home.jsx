import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import VehiclePanel from "../components/VehiclePanel";
import LocationSearchPanel from "../components/LocationSearchPanel";
import ConfirmRide from "../components/ConfirmRide";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        opacity:1,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        padding: 0,
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        // opacity: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      })
    }
  }, [panelOpen]);

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform : 'translateY(0)',
        opacity: 1,

      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform : 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {
        transform : 'translateY(0)',
        opacity: 1,

      })
    }else{
      gsap.to(confirmRidePanelRef.current, {
        transform : 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        className="w-20 absolute left-5 top-5"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber-Logo"
      />
      <div  className="h-screen w-screen">
        {/* for temporary purpose */}
        <img
          className="h-full w-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Uber-map-img"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white relative">
          <h5 ref={panelCloseRef} onClick={()=>{
            setpanelOpen(false);
          }} 
          className="absolute opacity-0 top-2 right-6 text-2xl">
            <IoIosArrowDown />
          </h5>
          <h4 className="text-2xl font-semibold top-9">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setpanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a Pick-up Location"
            />
            <input
              onClick={() => {
                setpanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter Your Destinatio"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel setpanelOpen={setpanelOpen}  setVehiclePanel = {setVehiclePanel} />
        </div>
      </div>
          <div ref= {vehiclePanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white px-3 py-6">
            <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmRidePanel={setConfirmRidePanel}/>  
          </div>
          <div ref= {confirmRidePanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white px-3 py-6">
              <ConfirmRide setConfirmRidePanel= {setConfirmRidePanel} />
          </div>

    </div>
  );
};

export default Home;
