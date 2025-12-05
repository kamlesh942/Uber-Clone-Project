// import React from 'react'

import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { CaptainContext } from "../context/captainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData]  = useState('');

  // useEffect(() => {
  //     console.log("Updated userData:", captainData);
  //   }, [captainData]);

    const navigate = useNavigate();
    const { captain, setCaptain } = React.useContext(CaptainContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = { 
      email: email, 
      password: password 
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    if(response.status === 200){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);

      navigate("/captain-home");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between min-h-full ">
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
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            type="email"
            placeholder="example@gmail.com"
            required
          />
          <h3 className="text-lg mb-2">Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-full text-lg placeholder:text-lg"
            type="password"
            placeholder="Enter your password"
            required
          />
          <button
            className="bg-[#212121] text-white mb-3 py-2 px-5 font-semibold rounded-lg w-full"
            type="submit"
          >
           Captain_login
          </button>
        </form>
        <p className="text-center mb-2">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="text-blue-600 font-semibold">
            Register as captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/user-login"
          className="bg-[#c65315] text-white flex items-center justify-center  mb-7 py-2 px-5 font-semibold rounded-lg w-full"
        >
          SignIn as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
