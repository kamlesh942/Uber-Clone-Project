import { useContext, useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const Navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);

  // ✅ Correct place for useEffect
  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    
    const newUSer = {
      fullname: {
        firstname:firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
    // console.log("URL =", `${import.meta.env.VITE_BASE_URL}/user/signup`);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUSer);
      if(response.status === 201){
        const data = response.data;
        setUser(data);
        Navigate("/home");
      }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="p-7 flex flex-col justify-between min-h-full">
      <div>
        <img
          className="w-16 mb-7"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg mb-2">What's your Name</h3>
          <div className="flex gap-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-1/2 text-lg placeholder:text-lg"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-1/2 text-lg placeholder:text-lg"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="text-center mb-2">
          Already have account?{" "}
          <Link to="/user-login" className="text-blue-600 font-semibold">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <p className="text-center text-sm text-gray-500">
          By signing up, you agree to our Terms,{" "}
          <span className="underline">Data Policy and Google Policy.</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
