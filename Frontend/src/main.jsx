import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import UserContextProvider from "./context/userContext";
import CaptainContextProvider from "./context/captainContext.jsx";
import SocketProvider from "./context/socketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContextProvider>
      <UserContextProvider>
        <SocketProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        
          {/* <BrowserRouter>
            <App />
          </BrowserRouter> */}
        </SocketProvider>
      </UserContextProvider>
    </CaptainContextProvider>
  </StrictMode>,
);
