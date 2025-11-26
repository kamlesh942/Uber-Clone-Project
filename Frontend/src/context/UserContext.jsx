import React, { createContext } from "react";

const userDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    fullname :{
        firstName: "",
        lastName: ""
    },
    email: "",
  });

  const value = {
    user,
    setUser,
  }
  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
