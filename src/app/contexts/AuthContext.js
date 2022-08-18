import { UserAPI } from "api/UserAPI";
import { AuthAPI } from "api/AuthAPI";
import * as React from 'react';
import { useState } from "react";


const AuthContext = React.createContext({
  isLogged: false,
  signin: null,
  signout: null,
  signup: null,
});

export const useAuth = () => {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [sessionRestoredTried, setSessionRestoredTried] = useState(false);

  const signin = (
    username,
    password,
    rememberFlag,
    successCallback = () => void 0,
    errorCallback = () => void 0
  ) => {
    AuthAPI.signin(
      username,
      password,
      rememberFlag,
      () => {
        console.log("Signed in");
        setIsLogged(true);
        successCallback();
      },
      () => {
        console.log("Signin failed");
        setIsLogged(false);
        errorCallback();
      },
    );
  }

  const signup = (
    username,
    password,
    successCallback = () => void 0,
    errorCallback = () => void 0
  ) => {
    UserAPI.create(
      username,
      password,
      () => {
        console.log("User created");
        successCallback();
      },
      () => {
        console.log("Error creating user");
        errorCallback();
      },
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

  const contextValue = { isLogged, signin, signout, signup,}

  if (sessionRestoredTried)
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}