import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const socket = io(`${import.meta.env.VITE_BASE_URL}`);

// export const SocketProvider = ({ children }) => {
//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Connected to Socket.IO server");
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected from Socket.IO server");
//     });

    
//   }, []);

//   return (
//     <SocketContext.Provider 
//     value={{ socket }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};


export default SocketProvider;