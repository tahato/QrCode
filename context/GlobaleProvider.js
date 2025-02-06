import React, { createContext, useContext, useEffect, useState } from "react";


const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [myCodes, setMyCodes] = useState([]);


  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        myCodes,
        setMyCodes,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
 
export default GlobalProvider;