import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import {AppContext} from "./AppContext";
import {PageNotFound} from "./PageNotFound/PageNotFound";
import {paths} from "./utils/route_paths";

function App() {
  const {
    globalState: { name },
  } = useContext(AppContext);

const {login, notes} = paths;
  return (
    <div className="App">
      <header className="App-header">{name}</header>
      <Switch>
        <Route exact path={login}>
          {/*Here Login Component*/}
        </Route>
        <Route exact path={notes}>
          {/* Here Notes Component*/}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
