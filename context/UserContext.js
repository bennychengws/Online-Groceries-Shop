import { useEffect, createContext, useContext, useMemo, useState, useReducer } from "react";
import { UserReducer, initialState } from "./UserReducer";

const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [userState, setUserState] = useState({});

//   const setUserContent = (content) => {
//    setUserState(content)
//   } 

//   return (
//     <UserContext.Provider value={{ userState, setUserContent }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export { UserContext, UserContextProvider };


export function UserWrapper({ children }) {
  const [userState, dispatch] = useReducer(UserReducer, initialState);
  const contextValue = useMemo(() => {
     return [userState, dispatch];
  }, [userState, dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined" && JSON.parse(localStorage.getItem("myAccount"))) { 
      //checking if there already is a state in localstorage
      dispatch({
        type: "init_stored",
        value: JSON.parse(localStorage.getItem("myAccount")), 
        //if yes, update the current state with the stored one
      });
    }
  }, []);

  useEffect(() => {
   if (typeof window !== "undefined" && userState !== initialState) {
   localStorage.setItem('myAccount', JSON.stringify(userState))
      //create and/or set a new localstorage variable called "myAccount"
  }
 }, [userState])  



  return (
  <UserContext.Provider value={contextValue}>
     {children}
  </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}


// export function UserWrapper({ children }) {
//    const [userState, setUserState] = useState({});
//    const contextValue = useMemo(() => {
//       return [userState, setUserState];
//    }, [userState, setUserState]);

//    useEffect(() => {
//     if (typeof window !== "undefined") {
//     localStorage.setItem('myAccount', JSON.stringify(userState))
//     }
//   }, [userState])  

//    return (
//    <UserContext.Provider value={contextValue}>
//       {children}
//    </UserContext.Provider>
//    );
// }

// export function useUserContext() {
//    return useContext(UserContext);
// }