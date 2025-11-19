import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import UserLogin from './pages/userLogin.jsx'
import UserSignup from './pages/userSignup.jsx'
import CaptainLogin from './pages/captainLogin.jsx'
import CaptainSignup from './pages/captainSignup.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/user-login" element = {<UserLogin/>}/>
        <Route path = "/user-signup" element = {<UserSignup/>}/>
        <Route path = "/captain-login" element = {<CaptainLogin/>}/>
        <Route path = "/captain-signup" element = {<CaptainSignup/>}/>



      </Routes>
    </div>
  )
}

export default App
