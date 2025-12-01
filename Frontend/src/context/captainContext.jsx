import {createContext, useContext, useState} from 'react'

export const CaptainContext = createContext();

const captainContextProvider = ({children}) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateCaptain = (CaptainData) => {
        setCaptain(CaptainData);
    };
    const value = {
        captain,
        setCaptain,
        isLoading,
        updateCaptain,
        error,
        setError,
        updateCaptain,

        
    };

  return (
    <CaptainContext.Provider value={{value}}>
      {children}
    </CaptainContext.Provider>
  );
}

export default captainContextProvider