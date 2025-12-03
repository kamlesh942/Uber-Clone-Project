import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Start from './pages/Start.jsx'
import UserLogin from './pages/UserLogin.jsx'
import UserSignup from './pages/UserSignup.jsx'
import CaptainLogin from './pages/captainLogin.jsx'
import CaptainSignup from './pages/CaptainSignup.jsx'
import UserLogout from './pages/UserLogout.jsx'
import UserProtectWrappers from './pages/UserProtectWrappers.jsx'
import CaptainHome from './pages/CaptainHome.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Start/>}/>
        <Route path = "/user-login" element = {<UserLogin/>}/>
        <Route path = "/user-signup" element = {<UserSignup/>}/>
        <Route path = "/captain-login" element = {<CaptainLogin/>}/>
        <Route path = "/captain-signup" element = {<CaptainSignup/>}/>
        <Route path= "/Home" element = 
        {<UserProtectWrappers>
          {<Home />}
        </UserProtectWrappers>}/>
        <Route 
        path='/user/logout' element = {
          <UserProtectWrappers>
            <UserLogout/>
          </UserProtectWrappers>
        }/>
        <Route 
          path = "/captain-home" element = {
          <CaptainHome/>
      }/>



      </Routes>
    </div>
  )
}

export default App
