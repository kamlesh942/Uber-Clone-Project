import React, { useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainContext } from "../context/captainContext";

const CaptainProtectWrapper = ({children}) => {
    const token =localStorage.getItem("token");
    const navigate = useNavigate();

    const {captain, setCaptain} = useContext(CaptainContext);
    console.log(token);
    useEffect(() =>{
        if(!token){
            navigate('/captain-login');
        }
    }, [token]);
  return (
    <>
        {children}
    </>
  )
}

export default CaptainProtectWrapper