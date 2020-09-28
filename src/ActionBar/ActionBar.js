import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export function ActionBar() {
  const { updateGlobalState } = useContext(AppContext);

  function logout() {
    updateGlobalState({ isLoggedIn: "" });
  }
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
