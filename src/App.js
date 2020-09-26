import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { AppContext } from "./AppContext";
import {PageNotFound} from "./Page_not_found/Page_not_found";

function App() {
  const {
    globalState: { name },
  } = useContext(AppContext);

  const paths = { login: "login", notes: "notes" };
  return (
    <div className="App">
      <header className="App-header">{name}</header>
      <Switch>
        <Route exact path={paths.login}>
          {/*Here Login Component*/}
        </Route>
        <Route exact path={paths.notes}>
          {/* Here Notes Component*/}
        </Route>
          <Route path="*">

          <PageNotFound/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
