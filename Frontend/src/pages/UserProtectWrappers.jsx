import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/userContext";
import axios from "axios";




const UserProtectWrappers = ({
    children

}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if(!token){
            navigate('/user-login');
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {

            if(response.status === 200){
                setUser(response.data.user);
                setIsLoading(false);
            }
        }).catch((error) => {
            console.error("Error fetching user profile:", error);
            localStorage.removeItem("token");
            navigate('/user-login');
        })
    }, [token]);

    if(isLoading){
        return <div>Loading...</div>;
    }
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectWrappers