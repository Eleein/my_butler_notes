import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import styles from "./App.module.scss";
import { AppContext } from "./AppContext";
import { ActionBar } from "./ActionBar/ActionBar";
import { PageNotFound } from "./PageNotFound/PageNotFound";
import { paths } from "./utils/route_paths";
import { Login } from "./Login/Login";
import {NotesList} from "./Notes/NotesList";

function App() {
  const { login } = paths;
  const {
    globalState: { isLoggedIn },
  } = useContext(AppContext);
  return (
    <div className={styles.App}>
      {isLoggedIn && <ActionBar />}
      <Switch>
        <Route exact path={login}>
          {isLoggedIn ? <NotesList /> : <Login />}
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
