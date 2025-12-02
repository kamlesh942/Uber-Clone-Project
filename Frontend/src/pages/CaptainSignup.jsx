import React, {useEffect, useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/captainContext.jsx";

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const {captain, setCaptain} = React.useContext(CaptainContext);

  useEffect(() => {
      console.log("Updated userData:", userData);
    }, [userData]);
  const submitHandler = async (e) => {
    e.preventDefault();
    

    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };
    
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/captains/signup`, captainData);
    
    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };
  return (
    <div className="px-5 py-5 flex flex-col justify-between min-h-full">
      <div>
        <img
          className="w-16 mb-7"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2">What's your Name</h3>
          <div className="flex gap-4">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-1/2 text-lg placeholder:text-lg"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-1/2 text-lg placeholder:text-lg"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            type="email"
            placeholder="example@gmail.com"
            required
          />
          <h3 className="text-lg mb-2">Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            type="password"
            placeholder="Enter your password"
            required
          />
          <h3 className="text-lg mb-2">Vehicle information</h3>
          <div className="flex space-between">
            <input 
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eee] mb-7 outline-none mx-2 rounded px-4 py-2 border w-[50%] text-lg placeholder:text-lg"
              type="text"
              placeholder="Vehicle Color"
              required
            />
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eee] mb-7 outline-none rounded mx-2 px-4 py-2 border w-[50%] text-lg placeholder:text-lg"
              type="text"
              placeholder="Vehicle Plate Number"
              required
            />
            </div>
            <div className="flex space-between">
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eee] mb-7 outline-none rounded mx-2 px-4 py-2 border w-[50%] text-lg placeholder:text-lg"
              type="text"
              placeholder="Vehicle Capacity"
              required
            />
            <select name="select" id="" className="g-[#eee] mb-7 mx-2 outline-none rounded px-4 py-2 border w-[50%] text-lg placeholder:text-lg">
              <option value=""> Select Vehicle Type</option>
              <option value=""> car</option>
              <option value=""> MoterCycle</option>
              <option value=""> Auto</option>

            </select>
          </div>
          <button
            className="bg-[#212121] text-white mb-3 py-2 px-5 font-semibold rounded-lg w-full"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-center mb-2">
          Already have account?{" "}
          <Link to="/captain-login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-center text-sm text-gray-500">
          By signing up, you agree to our Terms ,{" "}
          <span className="underline">Data Policy and Google Policy.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
