import { AuthAPI } from "api/AuthAPI";
import * as React from 'react';
import { useState } from "react";


const AuthContext = React.createContext({
  isLogged: false,
  signin: null,
  signout: null,
});

export const useAuth = () => {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [sessionRestoredTried, setSessionRestoredTried] = useState(false);

  const signin = (username, password, successCallback, errorCallback, rememberFlag) => {
    AuthAPI.signin(
      username,
      password,
      () => {
        console.log("Signed in");
        setIsLogged(true);
        successCallback();
      },
      () => {
        console.log("Signin failed");
        setIsLogged(true);
        errorCallback();
      },
      rememberFlag
    );
  }

  const signout = (callback) => {
    AuthAPI.signout();
    callback();
  }

  const trySessionRestore = () => {
    AuthAPI.restore_session(
      () => {
        console.log("Session restored");
        setSessionRestoredTried(true);
        setIsLogged(true);
      },
      () => {
        console.log("Session restore failed");
        setSessionRestoredTried(true);
      }
    )
  }

  React.useEffect(() => trySessionRestore(), []);

  const contextValue = { isLogged, signin, signout }

  if (sessionRestoredTried)
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}