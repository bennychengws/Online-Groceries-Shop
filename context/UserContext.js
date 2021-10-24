import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  const setUserContent = (content) => {
   setUserState(content)
  } 

  return (
    <UserContext.Provider value={{ userState, setUserContent }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };

// export function UserWrapper({ children }) {
//    const [userState, setUserState] = useState({});
//    const contextValue = useMemo(() => {
//       return [userState, setUserState];
//    }, [userState, setUserState]);

//    return (
//    <UserContext.Provider value={contextValue}>
//       {children}
//    </UserContext.Provider>
//    );
// }

// export function useUserContext() {
//    return useContext(UserContext);
// }