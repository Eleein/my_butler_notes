import React from "react";
import ReactDOM from "react-dom";
import { BindAppContext } from "./AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";


ReactDOM.render(
  <React.StrictMode>
    <BindAppContext>
      <Router>
        <App />
      </Router>
    </BindAppContext>
  </React.StrictMode>,
  document.getElementById("root")
);


