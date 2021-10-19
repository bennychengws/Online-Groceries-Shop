import { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext();

export function UserWrapper({ children }) {
   const [userState, setUserState] = useState({});
   const contextValue = useMemo(() => {
      return [userState, setUserState];
   }, [userState, setUserState]);

   return (
   <UserContext.Provider value={contextValue}>
      {children}
   </UserContext.Provider>
   );
}

export function useAppContext() {
   return useContext(UserContext);
}