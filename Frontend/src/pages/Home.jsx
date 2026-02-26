import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import VehiclePanel from "../components/VehiclePanel";
import LocationSearchPanel from "../components/LocationSearchPanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/socketContext";
import { UserContext } from "../context/userContext";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  const { socket } = useContext(SocketContext);  
  const {user} = useContext(UserContext);
  useEffect(() => {
  if (!user || !user._id) return;

  console.log("User in Home component:", user);

  socket.emit("join", { userType: "user", userId: user._id });
}, [user]);

  // useEffect(() => {
  //   console.log("vehicleFound:", vehicleFound);
  // }, [vehicleFound]);

  const normalizeSuggestions = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.suggestions)) return data.suggestions;
    return [];
  };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setPickupSuggestions(normalizeSuggestions(response.data));
    } catch (err) {
      console.log("Error in  handlePickupChange", err);
      throw err;
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setDestinationSuggestions(normalizeSuggestions(response.data));
    } catch (err) {
      console.log("Error in handleDestinationChange", err);
      throw err;
    }
  };

  const findTrip = async function () {
    setpanelOpen(false);
    setVehiclePanel(true);
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    setFare(response.data);
    console.log("Fare response:", response.data);
  };

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    console.log("Create ride response:", response.data);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

  useEffect(() => {
    if (vehicleFound) {
      setConfirmRidePanel(false);
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        opacity: 1,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        padding: 0,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        // opacity: 0,
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
          opacity: 1,
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel],
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
          opacity: 1,
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel],
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
          opacity: 1,
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound],
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
          opacity: 1,
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

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
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setpanelOpen(false);
            }}
            className="absolute opacity-0 top-2 right-6 text-2xl"
          >
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
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a Pick-up Location"
            />

            <input
              onClick={() => {
                setpanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black px-4 py-2 text-white rounded-xl mt-3 w-full text-lg"
          >
            Find ride
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            setpanelOpen={setpanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 w-full translate-y-full bottom-0 bg-white px-3 py-6"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 w-full translate-y-full bottom-0 bg-white px-3 py-6"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>
      {vehicleFound && (
        <div
          ref={vehicleFoundRef}
          className="fixed z-10 w-full bottom-0 bg-white px-3 py-6"
        >
          <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            fare={fare}
            setVehicleFound={setVehicleFound}
          />
        </div>
      )}
      <div
        ref={WaitingForDriverRef}
        className="fixed z-10 w-full  bottom-0 bg-white px-3 py-6"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
