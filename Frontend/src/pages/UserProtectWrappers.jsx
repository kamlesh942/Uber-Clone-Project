import React, {useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/userContext";



const UserProtectWrappers = ({
    children

}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    useEffect(() => {
        if(!token){
            navigate('/user-login');
        }
    }, [token]);
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrappers