import React from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";


import { PageNotFound } from "./PageNotFound/PageNotFound";
import { paths } from "./utils/route_paths";
import { Login } from "./Login/Login";

function App() {
  const { login, notes } = paths;
  return (
    <div className={styles.App}>
      <Switch>
        <Route exact path={login}>
          <Login />
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
