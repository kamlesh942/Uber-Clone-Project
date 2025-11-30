import {createContext, useContext, useState} from 'react'

export const CaptainContext = createContext();
export const useCaptain = () =>{
    const context = useContext(CaptainContext);
    if(!context){
        throw new Error("useCaptain must be used within a CaptainContextProvider");
    }
    return context;
};
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
        
    }
  return (
    <CaptainContext.Provider value={{children}}>
      {children}
    </CaptainContext.Provider>
  );
}

export default captainContextProvider