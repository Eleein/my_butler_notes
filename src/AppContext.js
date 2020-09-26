import React, { useState } from "react";

export const AppContext = React.createContext();

//HOC returns provider and allows usage of state variables from within the function.
export function BindAppContext({ children }) {
  const [globalState, setGlobalState] = useState({ name: "Hello World" });
  //updateGlobalState is used in two ways:
  /* 1: Passing the whole response object of the API call into globalState
   *  2: Updating individual part of the globalState object */
  function updateGlobalState(updatedProperties) {
    setGlobalState((prevGlobalState) => ({
      ...prevGlobalState,
      ...updatedProperties,
    }));
  }

  return (
    <AppContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </AppContext.Provider>
  );
}

