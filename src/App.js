import React, { useContext } from "react";
import { AppContext } from "./AppContext";

function App() {
  const {
    globalState: { name },
  } = useContext(AppContext);

  return (
    <div className="App">
      <header className="App-header">{name}</header>
    </div>
  );
}

export default App;
