import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { ReactComponent as Logo } from "../images/logo.svg";
import styles from "./ActionBar.module.scss";

export function ActionBar() {
  const { updateGlobalState } = useContext(AppContext);

  function logout() {
    updateGlobalState({ isLoggedIn: "" });
  }
  return (
    <div className={styles.actionBarLayout}>
      <div>
        <Logo className={styles.logo} />
      </div>
      <button onClick={logout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}
