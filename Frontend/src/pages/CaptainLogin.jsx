// import React from 'react'

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captainData, setCaptainData] = useState('');

  useEffect(() => {
      console.log("Updated userData:", captainData);
    }, [captainData]);

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({ email: email, password: password });
    
    
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
            Login
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
