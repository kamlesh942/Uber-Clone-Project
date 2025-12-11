import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

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
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        className="w-20 absolute left-5 top-5"
        src="https://brandeps.com/logo-download/U/Uber-logo-02.png"
        alt="Uber-Logo"
      />
      <div className="h-screen w-screen">
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
          <LocationSearchPanel/>
        </div>
      </div>
      <div className="fixed z-10 w-full bottom-0 bg-white px-3 py-6">
              <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
              <div className="flex border-2 border-black rounded-xl mb-2 w-full p-2 items-center justify-center">
                <img className="h-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFAeFmvyzZoJz2iCdXy19QhPSXOmzg-j25uQ&s" alt="Car Image" />
                <div className="ml-3 w-1/2 px-5" >
                  <h4 className="flex font-medium text-base">UberGo <span className="flex ml-1 gap-1"><FaUser /> 4 </span></h4>
                  <h5 className="font-medium text-sm">2 mins away</h5>
                  <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹193.20</h2>
              </div>
              <div className="flex border-2 border-black rounded-xl mb-2 w-full p-2 items-center justify-center">
                <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="motercycle Image" />
                <div className="ml-3 w-1/2 px-5" >
                  <h4 className="flex font-medium text-base">UberGo <span className="flex ml-1 gap-1"><FaUser /> 1 </span></h4>
                  <h5 className="font-medium text-sm">3 mins away</h5>
                  <p className="font-normal text-xs text-gray-600">Affordable, motor cycle rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹65.20</h2>
              </div>
              <div className="flex border-2 border-black rounded-xl mb-2 w-full p-2 items-center justify-center">
                <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="auto Image" />
                <div className="ml-3 w-1/2 px-5" >
                  <h4 className="flex font-medium text-base">UberGo <span className="flex ml-1 gap-1"><FaUser /> 3 </span></h4>
                  <h5 className="font-medium text-sm">4 mins away</h5>
                  <p className="font-normal text-xs text-gray-600">Affordable, auto rides</p>
                </div>
                <h2 className="text-2xl font-semibold">₹183.20</h2>
              </div>
      </div>
    </div>
  );
};

export default Home;
