import { use, useState } from "react";
import { Link } from "react-router-dom";


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ firstName, setFirstName] = useState('');
  const [ lastName, setLastName] = useState('');
  const submitHandler = (e) =>{
    e.preventDefault();
    console.log({firstName, lastName, email, password});
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  return (
   <div className="p-7 flex flex-col justify-between h-screen">
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
         <div className='flex gap-4'>
          <input
           value={firstName}
           onChange={(e)=>{
            setFirstName(e.target.value);
           }}
            className="bg-[#eee] mb-7 outline-none rounded px-4 py-2 border w-1/2 text-lg placeholder:text-lg"
            type="text"
            placeholder="First Name"
            required
          />
          <input
          value={lastName}
          onChange={(e)=>{
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
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
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
        By signing up, you agree to our Terms , Data Policy and Cookies Policy .
      </p>
      </div>
    </div>
  )
}

export default UserSignup