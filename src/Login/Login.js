import React, { useContext } from "react";
import styles from "./Login.module.scss";
import { AppContext } from "../AppContext";

export function Login() {
  const {
    globalState: { email, password },
    updateGlobalState,
  } = useContext(AppContext);

  return (
    <div className={styles.loginLayout}>
      <div className={styles.formLayout}>
        <h1>Login</h1>
        <form className={styles.form}>
          <label htmlFor="email">Email:</label>
          <div className={styles.emailField}>
            <input
              type="email"
              id="email"
              required
              value={email}
              placeholder="email"
              onChange={({ target: { value } }) =>
                updateGlobalState({ email: value })
              }
            />
          </div>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            placeholder="password"
            onChange={({ target: { value } }) =>
              updateGlobalState({ password: value })
            }
          />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
